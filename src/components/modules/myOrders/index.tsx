"use client";

import { getMyOrderedProducts } from "@/services/order";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderedProductsCard } from "./orderedProductsCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ClipboardList } from "lucide-react";
import TablePagination from "@/components/ui/core/MMTable/TablePagination";
import { TMeta } from "@/types";
// import type { TOrder, IMeta } from "@/types"; // ✅ import your types
export type TOrder= {
  _id: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  finalAmount: number;
  deliveryCharge:number;
  discount:number;
  coupon:string;
  createdAt: string;
  updatedAt: string;
 shippingAddress: string;
  orderedProducts: { product: { name: string; price: number }; quantity: number }[];
}
const MyOrders = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [metaData, setMetaData] = useState<TMeta | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Extract primitives from searchParams (avoid reruns)
  const statusFromUrl = searchParams.get("status") || "all";
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const queryStatus = statusFromUrl === "all" ? undefined : statusFromUrl;
        const { data, meta } = await getMyOrderedProducts(
          String(pageFromUrl),
          undefined, // or any default limit you want
          { status: queryStatus }
        );

        setOrders(data || []);
        setMetaData(meta);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFromUrl, pageFromUrl]);

  // ✅ Handles updating query params
  const handleSearchQuery = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(query);
    } else {
      params.set(query, value);
    }
    params.set("page", "1"); // reset to page 1 whenever filter changes
    router.push(`${pathname}?${params.toString()}`);
  };

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Package className="text-4xl text-red-600" />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-gray-600 font-semibold text-sm">
            Filter by Status:
          </label>
          <Select
            value={statusFromUrl} // ✅ already extracted
            onValueChange={(val) => handleSearchQuery("status", val)}
          >
            <SelectTrigger className="w-[180px] bg-white shadow-sm border border-gray-200 focus:ring-red-500">
              <SelectValue placeholder="Sort by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order Status</SelectLabel>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Content */}
      {loading ? (
        // ✅ Skeleton loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : orders.length > 0 ? (
        <div>
          {/* Orders grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {orders.map((order) => (
              <OrderedProductsCard key={order._id} order={order} /> 
            ))}
          </div>

          {/* Pagination */}
          {metaData && <TablePagination totalPage={metaData.totalPage} />}
        </div>
      ) : (
        // ✅ Empty state
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg shadow-sm border border-gray-200">
          <ClipboardList className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">No Orders Found</h2>
          <p className="mt-2 text-gray-500">
            It looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;





// "use client";

// import { getMyOrderedProducts } from "@/services/order";
// import { useEffect, useState } from "react";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { OrderedProductsCard } from "./orderedProductsCard";

// export type TOrder= {
//   _id: string;
//   status: string;
//   paymentStatus: string;
//   totalAmount: number;
//   finalAmount: number;
//   deliveryCharge:number;
//   discount:number;
//   coupon:string;
//   createdAt: string;
//   updatedAt: string;
//  shippingAddress: string;
//   orderedProducts: { product: { name: string; price: number }; quantity: number }[];
// }

// type status = Promise<{ [key: string]: string | string[] | undefined }>;


// const MyOrders = () => {
//   const [orders, setOrders] = useState<TOrder[]>([]);
//   const [status, setStatus] = useState<string>("");
  
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//      const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await getMyOrderedProducts(undefined,undefined,{status})
//        if (res?.success) {
//           setOrders(res?.data || []);
//         }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }
//     fetchOrders();
//   }, [status]);
//   const pathname=usePathname()
//   const router=useRouter()
//   const searchParams=useSearchParams()

//  const handleSearchQuery=(query:string,value:string)=>{
// const params=new URLSearchParams(searchParams.toString())
// params.set(query,value.toString())
// router.push(`${pathname}?${params.toString()}`)
//  }

// console.log(orders,'from my orders');
//   return (
//     <div className="space-y-2">
//       {/* Status Filter */}
//       <div>
//         <h2 className="mr-2">Filter by Status :</h2>
//         <Select value={status} onValueChange={(val) => {setStatus(val)
//         handleSearchQuery('status',val)
//             console.log(val);
//         }}>
//      <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Sort by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Order Status</SelectLabel>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="delivered">Delivered</SelectItem>
//               <SelectItem value="cancelled">Cancelled</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//     </Select>
//       </div>
//     {/*orderedProducts card  */}

//     <div className="grid grid-col gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {orders.map((order,idx)=>(
//             <OrderedProductsCard key={idx} order={order}/>
//         )
//         )}
//     </div>

//       {/* Orders List */}
   
//     </div>
//   );
// };

// export default MyOrders;


