"use server";

import { getValidToken } from "@/lib/verifyToken";
import { ICoupon, IOrder } from "@/types";
import { cookies } from "next/headers";

// export const createOrder = async (order: IOrder) => {
//   try {
//     console.log('order from ordered index',order);
//     const token = await getValidToken();
//     console.log('oi hala cookie de :',token,'token from create order index');
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`, {
//       method: "POST",
//       headers: {
//         Authorization:token,
//       },
//       body: JSON.stringify(order),
//     });

//     return await res.json();
//   } catch (error: any) {
//   return { success: false, message: error.message }
//   }
// };
//addCoupon
export const addCoupon = async (
  couponCode: string,
  subTotal: number,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderAmount: subTotal}),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
