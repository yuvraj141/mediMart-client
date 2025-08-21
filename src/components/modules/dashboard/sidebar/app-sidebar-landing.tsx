"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { getAllCategories } from "@/services/category";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NavMain from "./nav-main";
import { Menu, X, Cookie, Flame } from "lucide-react";

export function AppSidebarLandingPage({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const navMain = [
    {
      title: "Food",
      url: "#",
      icon: Cookie,
      items: categories.map((cat) => ({
        title: cat.name,
        url: `/products?category=${cat._id}`,
      })),
    },
    {
      title: "Flash-Sales",
      url: "/flashSale",
      icon: Flame,
    },
  ];

  return (
    <div>
      {/* 🔥 Always visible menu icon */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (floating for all devices) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button (inside sidebar) */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <Sidebar className="border-none shadow-none" {...props}>
          <div>
            {isLoading ? (
              <p className="p-4 text-center text-gray-500">
                Loading categories...
              </p>
            ) : (
              <NavMain items={navMain} />
            )}
          </div>
        </Sidebar>
      </div>
    </div>
  );
}







///---------*******/////
// "use client"
// import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
// import { getAllCategories } from "@/services/category";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import NavMain from "./nav-main";
// import { NavUser } from "./nav-user";
// import {
//   Cookie,Flame,
//   SparkleIcon
// } from "lucide-react";
// import Link from "next/link";
// export function AppSidebarLandingPage({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [{ data: categoriesData }] = await Promise.all([getAllCategories()]);
//         setCategories(categoriesData || []);
//       } catch (error: any) {
//         console.error(error);
//         toast.error("Failed to fetch categories");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const navMain = [
//     {
//       title: "Food",
//       url: "#",
//       icon: Cookie, // default icon for the main category group
//       items: categories.map((cat) => ({
//         title: cat.name,
//         url: `/products?category=${cat._id}`,
//       })),
//     },
//     {
//       title: "Flash-Sales",
//       url: "/flashSale",
//       icon: Flame //  
//       },
    
//   ];

//   return (
//     <div className="">
//       <Sidebar className="h-12  mt-20  " collapsible="icon" {...props}>
      

//       {/* <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <Link href={'/'} passHref>
//             <h3 className="font-bold text-center">Home </h3>
//             </Link>
            
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader> */}
// {/* <SidebarContent> */}


//       <div className=" ">
//         {isLoading ? (
//           <p className="p-4  text-center text-gray-500">Loading categories...</p>
//         ) : (
//           <NavMain items={navMain} />
//         )}
//       </div>
//      {/* </SidebarContent> */}
//     </Sidebar>
//     </div>
//   );
// }
