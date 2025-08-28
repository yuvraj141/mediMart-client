"use client";
import { useEffect } from 'react';
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { toast } from 'sonner';

const SuccessPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch the clearCart action only when the user lands on this page
    dispatch(clearCart());
    // Show a success message to the user
    toast.success("Payment successful! Your cart has been cleared.");
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-5">
            <Check className="size-40 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Thank you for your purchase! Your payment has been processed
            successfully.
          </p>
          <Link href="/products" legacyBehavior>
            <Button className='cursor-pointer'>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;





// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import Link from "next/link";

// const SuccessPage = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <div className="flex flex-col items-center">
//           <div className="bg-green-100 p-3 rounded-full mb-5">
//             <Check className="size-40 text-green-500" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Payment Successful
//           </h1>
//           <p className="text-gray-600 mb-6 text-center">
//             Thank you for your purchase! Your payment has been processed
//             successfully.
//           </p>

//           <Link href="/products" legacyBehavior>
//             <Button>Continue Shopping</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;
