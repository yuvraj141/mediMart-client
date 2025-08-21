"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

//registerUser
export const registerUser=async(userData:FormData)=>{
  console.log(userData);
  try {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/create-user`,{
        method:'POST',
        body:userData
    })
    const result=await res.json()
    if(result.success){
    (await cookies()).set('accessToken',result.data?.accessToken);
    (await cookies()).set("refreshToken", result?.data?.refreshToken);
  }
  return result
  } catch (error:any) {
    return Error(error)
  }
}

//loginUser
export const loginUser=async(userData:FieldValues)=>{
    try {
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(userData)
        })
        const result=await res.json()
        console.log(result);
        //setting accessToken and refresh token manually
        if(result?.success){
            ((await cookies()).set("accessToken",result?.data?.accessToken));
            (await cookies()).set("refreshToken", result?.data?.refreshToken);
        }
        return result
    } catch (error:any) {
        return Error(error)
    }
}
//logOut
export const logout = async () => {
  (await cookies()).delete("accessToken");
};
//getCurrent user
export const getCurrentUser=async()=>{
    const accessToken=(await cookies()).get('accessToken')?.value
    let decodedData=null;
    if(accessToken){
        decodedData=await jwtDecode(accessToken)
        return decodedData
    }else{
        return null
    }
}
//getNewToken using refresh token
export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
