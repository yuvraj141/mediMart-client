"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCart,
  couponSelector,
  discountAmountSelector,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/order";
// import { createOrder } from "@/services/cart";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const city = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const coupon = useAppSelector(couponSelector);

  const user = useUser();

  const router = useRouter();

const pathname = usePathname(); // Get the current path
  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
       router.push(`/login?redirectPath=${pathname}`);
       toast.error("Please login first.", { id: orderLoading });
        return; // Return to prevent further execution
      }

      if (!city) {
        throw new Error("City is missing");
      }
      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      let orderData;

      if (coupon.code) {
        orderData = { ...order, coupon: coupon.code };
      } else {
        orderData = order;
      }

      const res = await createOrder(orderData);
 console.log('response from create order :',res);
      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        router.push(res.data.paymentUrl);
       // dispatch(clearCart());
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
    console.log('ordered data',order);
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      {coupon.isLoading && <div>Loading...</div>}
      {!coupon.isLoading && (
        <>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <p className="text-gray-500 ">Subtotal</p>
              <p className="font-semibold">{currencyFormatter(subTotal)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 ">Discount</p>
              <p className="font-semibold">
                {currencyFormatter(discountAmount)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-500 ">Shipment Cost</p>
              <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <p className="text-gray-500 ">Grand Total</p>
            <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
          </div>
        </>
      )}
      <Button
        onClick={handleOrder}
        className="w-full text-md hover:bg-red-600 cursor-pointer bg-red-600 font-semibold py-5"
      >
        Proceed to checkout
      </Button>
    </div>
  );
}
