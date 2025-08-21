"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

//add flashSale
export const addFlashSale=async(ProductData:any):Promise<any>=>{
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flashSale/create-flashSale`,{
            method:'POST',
            headers:{
                Authorization:(await cookies()).get('accessToken')!.value,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ProductData)
        })
        revalidateTag('PRODUCT')
        return res.json()
    } catch (error:any) {
        return Error(error)
    }
}
// get Flash Sale Products
export const getFlashSaleProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flashSale`, {
      next: {
        tags: ["PRODUCT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
