import Image from "next/image";
import logo from '../../assets/Logo.png'
import { ShoppingCart } from 'lucide-react';
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
export default function Navbar(){


    return(
        <header className="container mx-auto py-5">
            <div className="flex justify-between">
                <Image src={logo} alt="logo"></Image>

               <div className="max-w-md  flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-green-300 rounded-full py-2 px-5"
          />
        </div>

       <div className="flex gap-2 items-center justify-center">
         <Link href='/cart'><ShoppingCart className="text-green-300"/>
        </Link>
        <Button variant='outline' className="text-green-400 border-green-300">Login</Button>

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
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
       
       </div>
            </div>
        </header>
    )
}