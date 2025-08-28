"use server";

import { getValidToken } from "@/lib/verifyToken";
import { ICoupon, IOrder } from "@/types";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrder) => {
   const token = await getValidToken();
  try {
    // console.log('order from ordered index',order);
    // console.log('oi hala cookie de :',token,'token from create order index');
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`, {
      method: "POST",
      headers: {
        Authorization:token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order),
    });

    return await res.json();
  } catch (error: any) {
  return { success: false, message: error.message }
  }
};
//getMyOrders
export const getMyOrderedProducts = async (page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }) => {

   const token = await getValidToken();
   const params=new URLSearchParams()
   if(query?.status){
    params.append('status',query?.status.toString())
   }
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/my-ordered-products?limit=${limit}&page=${page}&${params}`, {
      method: "GET",
      headers: {
        Authorization:token,
      },
        cache: "no-store", // prevent stale cache
    });
     const data=await res.json();
     console.log('data from getMyOrders index:',data);
    return data
  } catch (error: any) {
  return { success: false, message: error.message }
  }
};