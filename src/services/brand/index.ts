"use server"

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

//getAllBrands
export const getAllBrands=async()=>{
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ["Brands"],
      },
       });
       const data=await res.json()
       return data
    }catch (error: any) {
    return Error(error.message);
  }
}
//create brand
export const createBrand=async(brandData:FormData):Promise<any>=>{
//get new token using refresh token
const token = await getValidToken();
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand/create-brand`, {
      method: "POST",
      body: brandData,
      headers: {
        Authorization:token,
      },
    });
    revalidateTag("Brands");
    const data=res.json()
    return data
    }   catch (error: any) {
    return { success: false, message: error.message };
  }
    }

    // delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token
        },
      }
    );
    revalidateTag("Brands");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
