"use server";
import { getNewToken } from "@/services/authServices";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    const newToken = data?.accessToken;
  //    console.log("Old token:", token?.slice(0, 30));
  // console.log("New token:", newToken?.slice(0, 30));

  token = newToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};
