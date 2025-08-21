"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }

  if (query?.category) {
    params.append("categories", query?.category.toString());
  }
  if (query?.brand) {
    params.append("brands", query?.brand.toString());
  }
  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
//getSingleProduct
export const getSingleProduct=async(productId:string)=>{
  try {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,{
        next: {
          tags: ["PRODUCT"],
        },
      })
      const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
}
//getTrending products
export const getTrendingProducts=async()=>{
  try {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/trending-products`,{
        next: {
          tags: ["PRODUCT"],
        },
      })
      const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
}
// add product
export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products/add-product`, {
      method: "POST",
      body: productData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
// update product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/products//update-product/${productId}`,
      {
        method: "PATCH",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
