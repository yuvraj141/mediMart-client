import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import OrderDetailsDialog from "./orderDetailsDialog";

export function OrderedProductsCard({ order }) {
  // Determine the status color
  const statusColor = {
    pending: "text-yellow-500",
    delivered: "text-green-500",
    cancelled: "text-red-500",
  }[order.status] || "text-gray-500";
  
  // Format the date
  const orderDate = format(new Date(order?.createdAt), "MMMM dd, yyyy 'at' hh:mm a");
// console.log('order products',order);
  return (
    <Card className="transition-transform duration-300 hover:scale-[1.02] cursor-pointer hover:shadow-2xl bg-gradient-to-br ">
  <CardHeader className="">
    <CardTitle className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-50">
      <p>{orderDate}</p>

    <span className={`text-sm font-semibold ${statusColor} capitalize`}>
            {order.status}
           </span></CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
    
  </CardHeader>
  <CardContent>
    <p className="font-semibold">Subtotal :<span className="font-semibold text-md"> ৳</span> {order?.totalAmount}</p>
    <p className="font-semibold">Total  :<span className="font-semibold text-md"> ৳</span> {order?.finalAmount}</p>
    <p className="font-semibold">Discount Amount :<span className="font-semibold text-md"> ৳</span> {order?.discount}</p>
   
  </CardContent>
  <CardFooter className=" flex justify-end">
    <CardAction>
      
        <OrderDetailsDialog order={order}/>
        </CardAction>
  </CardFooter>
</Card>
    // <Card className="w-full max-w-lg mx-auto overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-slate-50 to-gray-200 dark:from-gray-800 dark:to-slate-900">
    //   <CardHeader className="p-6">
    //     <CardTitle className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-gray-50">
    //       <span>Order ID: {order._id.substring(0, 8)}...</span>
    //       <span className={`text-sm font-semibold ${statusColor} capitalize`}>
    //         {order.status}
    //       </span>
    //     </CardTitle>
    //     <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
    //       Placed on {orderDate}
    //     </CardDescription>
    //   </CardHeader>

    //   <CardContent className="p-6 pt-0 space-y-4">
    //     <div className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
    //       <span className="font-semibold text-gray-700 dark:text-gray-300">Total Amount:</span>
    //       <span className="text-lg font-bold text-gray-900 dark:text-gray-50">${order.totalAmount}</span>
    //     </div>
    //     <div className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
    //       <span className="font-semibold text-gray-700 dark:text-gray-300">Delivery Charge:</span>
    //       <span className="text-lg font-bold text-gray-900 dark:text-gray-50">${order.deliveryCharge}</span>
    //     </div>
    //     <div className="flex justify-between items-center py-2 border-b-2 border-indigo-500 dark:border-indigo-400">
    //       <span className="font-semibold text-gray-700 dark:text-gray-300">Final Amount:</span>
    //       <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
    //         ${order.finalAmount}
    //       </span>
    //     </div>
    //   </CardContent>

    //   <CardFooter className="flex justify-end p-6 pt-0">
    //     <Button className="w-full sm:w-auto px-6 py-3 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200">
    //       View Details
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}