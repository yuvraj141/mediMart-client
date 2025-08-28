import Address from "@/components/modules/cart/Address"
import CartProducts from "@/components/modules/cart/CartProducts"
import Coupon from "@/components/modules/cart/Coupon"
import PaymentDetails from "@/components/modules/cart/PaymentDetails"
import ProductBanner from "@/components/modules/products/banner"
import NMContainer from "@/components/ui/core/NMContainer"

const CartPage=()=>{

    return (
        <NMContainer>
            {/* <ProductBanner title="Cart Page" path="Home - Cart" /> */}
       <div className="flex flex-col md:flex-row lg:flex-row gap-8 my-5">
        <div>
 <CartProducts/>
        </div>
        
          <div>
   <Coupon/>
   <Address />
        <PaymentDetails />
        </div>

      </div>
        </NMContainer>
    )
}
export default CartPage