'use server'

import { getNewToken } from "@/services/authServices"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
//JWT.IO
export const isTokenExpired=async(token:string):Promise<boolean>=>{
    if(!token) return true
    try {
        const decoded:{exp:number}=jwtDecode(token)
        return decoded.exp*1000 <Date.now()
    } catch (err: any) {
    console.error(err);
    return true;
    }
}
//create new token using refresh token .use this where token is needed in authorization
export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};