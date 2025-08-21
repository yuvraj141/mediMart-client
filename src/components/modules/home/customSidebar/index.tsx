'use client'
import React, { useEffect, useState } from 'react'
import { Cookie, Flame, Menu ,X} from 'lucide-react';

import Image from "next/image";
import logo from '../../../../assets/shwapno_logo.png'
import { LogOut, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/authServices";
import { protectedRoutes } from "@/constants";
import { getAllCategories } from '@/services/category';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
const CustomSidebar = () => {
 const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: categoriesData }] = await Promise.all([
          getAllCategories(),
        ]);
        setCategories(categoriesData || []);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
console.log(categories,'all categories from navbar');

const [menuOpen,setMenuOpen]=useState(false)

const handleMenubar=()=>{
setMenuOpen(!menuOpen)
}
// Get the search parameters from the URL
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get('category');
  //nav
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
  return (
  <div>
      <div className='fixed top-0 left-0   z-40 h-24  w-full shadow-2xl bg-red-700'>
{/*  */}

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
          <Button variant='outline' className="">Login</Button>
         </Link>
        }
        {/* <Button variant='outline' className="text-green-400 border-green-300">Login</Button> */}

        <DropdownMenu>
  <DropdownMenuTrigger>
 <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>User</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
    </DropdownMenuItem>
  <DropdownMenuItem
                    className=" cursor-pointer"
                    onClick={handleLogOut}
                  >
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
       
       </div>
            </div>
        </header>
{/*  */}

<div className='p-2  flex shadow bg-white '>
    <div className='flex  gap-2 font-bold flex-1'  >
        <Menu onClick={handleMenubar}/>
        <span>shop by category</span>
    </div>
    <div className='flex-1 font-semibold flex  gap-5 items-center '>
        <div className='hover:text-blue-500 cursor-pointer'>Great deals</div>
        <div className='hover:text-blue-500 cursor-pointer'>Brands</div>
        <div className='hover:text-blue-500 cursor-pointer'>Support</div>
    </div>
</div>
{/*  */}
<div className={menuOpen? 'fixed overflow-y-auto top-0 sm:w-[40%] md:w-[20%] left-0 h-screen py-10 bg-white ease-in duration-500' :'fixed left-[-100%] top-0 ease-in duration-500'}>

    <div className='flex p-4 bg-red-500  w-full items-center justify-between'>
        <span className='text-white'>All Categories</span>
        <div onClick={handleMenubar} className='cursor-pointer text-white'>
            <X/>
        </div>
        
    </div>
 {/*  */}


 
     {/*  */}
<ul className='flex flex-col '>
   

          {loading ? (
            <p>Loading...</p>
          ) : (
            categories.length > 0 ? (
              categories.map((category) => (
                <li key={category?._id}>
                  <Link href={`/products?category=${category?._id}`} onClick={handleMenubar}>
                    <div  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors 
                      ${activeCategoryId === category?._id ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-200'}
                    `}>
                      <span>{category?.name}</span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p>No categories found.</p>
            )
          )}
        </ul>

      
</div>
    </div>
  </div>
  )
}

export default CustomSidebar