"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create category
export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category/create-category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//getAll categories
export const getAllCategories=async()=>{
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`)

        const data= res.json()
        return data
    } catch (error:any) {
        return Error(error)
    }
}
// delete category
export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
