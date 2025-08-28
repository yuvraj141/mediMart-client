import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TOrder } from "."
import { format } from "date-fns";
import Image from "next/image"
import { Description } from "@radix-ui/react-dialog"

const OrderDetailsDialog = ({ order }: { order: TOrder }) => {
  // console.log('ordered products details from the dialog', order);
  const orderDate = format(new Date(order.createdAt), "MMMM dd, yyyy 'at' hh:mm a");
  const statusUpdated = format(new Date(order.updatedAt), "MMMM dd, yyyy 'at' hh:mm a");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-600 text-white cursor-pointer  hover:bg-red-600">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="mt-5 mb-10 sm:max-w-[500px] text-black p-6">
        <Description>
          e
        </Description>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Order Summary
          </DialogTitle>
          <hr className="my-2" />
        </DialogHeader>

        <div className="py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Order Date:</p>
              <p className="text-lg font-medium">{orderDate}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Delivery status:</p>
              <p className={`text-lg font-medium capitalize ${order.status === 'delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                {order.status==='pending' ? 'pending' :<p>{order.status} at {statusUpdated}</p>}  
              </p>
            </div>
          </div>
           <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Subtotal :</p>
            <p className="font-bold text-red-600">
              <span className="text-md">৳</span>  {order.totalAmount}
            </p>
          </div>
           <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Delivery fee :</p>
            <p className=" font-bold text-red-600">
            ৳{order.deliveryCharge}
            </p>
          </div>
           <div >
           {order?.coupon && (
            <div>
                <div className="flex justify-between items-center">
                 <p className="text-gray-600 font-semibold">Voucher :</p>
            <p className="  text-red-600">
            ৳{order.coupon.code}
            </p>
            </div>
                <div className="flex justify-between items-center">
                 <p className="text-gray-600 font-semibold">Discount :</p>
            <p className=" font-bold text-red-600">
            ৳{order.discount}
            </p>
            </div>
            </div>
           )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Total </p>
            <p className=" font-bold text-red-600">
              ৳{order?.finalAmount}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-semibold">Shipping address : </p>
            <p className=" font-bold text-red-600">
              ৳{order?.shippingAddress}
            </p>
          </div>
         
        </div>

        <hr className="my-4" />

        <div className=" space-y-2">
          <h3 className="text-lg font-bold">Ordered Products</h3>
          <div className="h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {order.orderedProducts.map((orderProduct, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0">
               
                {/* Product Details */}
                <div className="flex-1">
                  <p className="font-semibold">{orderProduct.product.name}</p>
                  <p className="text-gray-500">
                    <span className="font-semibold text-red-500">৳{orderProduct.product.price}</span> x <span className="font-semibold">{orderProduct.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <DialogFooter className="mt-4 mb-5">
          <DialogClose asChild>
            <Button className="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailsDialog




// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { TOrder } from "."
// import { format } from "date-fns";
// import Image from "next/image"
// const  OrderDetailsDialog=({order}:{order:TOrder})=> {
//     console.log('ordered products details from the dialog',order);
//   const orderDate = format(new Date(order.createdAt), "MMMM dd, yyyy 'at' hh:mm a");

//   return (
//     <Dialog>
      
//         <DialogTrigger asChild>
//           <Button className="bg-red-600 text-white cursor-pointer hover:bg-red-600" >View Details</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] text-black">
//           <DialogHeader>
//             <DialogTitle className="text-center pb-2 mb-2">Order Summary <hr className="mt-2" /></DialogTitle>
//             <DialogDescription>
//                <h3 className="font-bold text-black">order date : {orderDate}</h3>
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 text-black">
//             <div className="grid gap-3">

//               <div  className="">
//                 <hr className="mt-2"/>
//  <p className="py-2">delivered status : {order.status}</p>
//  <p>Total amount : {order.totalAmount}</p>
//  <hr />
//               </div>
             
//             </div>
//             <div className="grid gap-3">
//                 <h3>Ordered products :</h3>
//              {
//                  order.orderedProducts.map((orderProduct,idx)=>(
//                     <div key={idx} className="">
// {/* child 1 */}
// <div>
// <p>Name : {orderProduct.product.name}  </p>
//              <div className="flex gap-2">
//  <p>Price : <span className=" font-semibold">{orderProduct.product.price}</span></p>
//  <p>Quantity : <span className="text-black font-semibold">{orderProduct.quantity}</span></p>
//                         </div>
// </div>
// {/* child 2 */}

//          <hr className="m-2"/>
//                     </div>
//                  ))
//              }
//             </div>
//           </div>
//         </DialogContent>
//     </Dialog>
//   )
// }


// export default OrderDetailsDialog