"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginValidation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import logo from '../../../../assets/Logo.png'
import { toast } from "sonner";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginUser } from "@/services/authServices";
import { useUser } from "@/context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import shwapnologo from '../../../../assets/shwapno_logo.png'

const LoginForm=()=>{
const form = useForm({
    resolver: zodResolver(loginSchema)
  });
  const {setIsLoading}=useUser()
  const {
    formState: { isSubmitting },
  } = form;
    const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  //onSubmit
  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    console.log('login data :',data);
    try {
      const res=await loginUser(data)
      setIsLoading(true)
      console.log(res);
      if(res.success){
        toast.success(res?.message)
         if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }else{
        toast.error(res?.message)
      }
    } catch (err: any) {
      console.error(err);
    }
  }
    return(
        <div className="border-2 space-y-3 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4 ">
        <Image src={shwapnologo} alt="logo"/>
        <div>
          <h1 className="text-xl text-red-500 font-semibold">Login</h1>
          <p className="font-extra-light text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
  {/* //form */}
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} >
    <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Email </FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

             <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* button */}
         <div className="text-white">
           <Button className="my-3 w-full  hover:bg-red-600 hover:text-white cursor-pointer bg-red-700" variant='outline'>{isSubmitting? 'Logging...':'Login'}</Button>

         </div>
  </form>
  </Form>
  <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-primary">
           Register
        </Link>
      </p>
        </div>
    )
}
export default LoginForm