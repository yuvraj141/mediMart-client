'use client'
import Image from "next/image";
import logo from '../../assets/shwapno_logo.png'
import { LogOut, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/authServices";
import { protectedRoutes } from "@/constants";
import { AppSidebarLandingPage } from "../modules/dashboard/sidebar/app-sidebar-landing";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CustomSidebar from "../modules/home/customSidebar";


export default function Navbar(){
const {user,setIsLoading}=useUser()
const pathname=usePathname()
// console.log(user);
const router=useRouter()
const handleLogOut=()=>{
  console.log('logout clicked');
  logout()
  setIsLoading(true)
  if(protectedRoutes.some((route)=>pathname.match(route))){
    router.push('/')
  }
}

    return(
      <>
      
      <div className="">
 <SidebarProvider className="border-2 border-black">
       
        {/* Sidebar */}
        
          <AppSidebarLandingPage/>
        
      </SidebarProvider>
      </div>
      
      <div className="fixed top-0 left-0 w-full z-40 bg-red-700 shadow">
     
 
          <header className="container mx-auto py-5">
            <div className="flex justify-between">
               <Link href={'/'} passHref>
                <Image src={logo} alt="logo"></Image>
               </Link>

               <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl text-black border bg-white border-white rounded-full py-2 px-5"
          />
        </div>

       <div className="flex gap-2 items-center justify-center">
         <Link href='/cart'><ShoppingCart className="text-white"/>
        </Link>
        {
          user?
           <Button  onClick={handleLogOut} variant='outline' className="text-black hover:cursor-pointer">LogOut</Button>
          :
         <Link href='/login' passHref>
          <Button  className="hover:cursor-pointer">Login</Button>
         </Link>
        }
        {/* <Button variant='outline' className="text-green-400 border-green-300">Login</Button> */}

        <DropdownMenu>
  <DropdownMenuTrigger>
 <Avatar className="hover:cursor-pointer" >
  <AvatarImage className="" src="https://github.com/shadcn.png" />
  <AvatarFallback>User</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My d Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
 </DropdownMenuItem>

    <DropdownMenuItem>
      <Link href={'/my-ordered-products'} passHref>
      My Orders</Link>
      </DropdownMenuItem>
    
  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
    
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
       
       </div>
            </div>
        </header>
      </div>
      </>
    )
}