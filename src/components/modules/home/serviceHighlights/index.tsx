
import { ShieldCheck, Headphones,WalletCards,Truck } from 'lucide-react';

const ServiceHighlights=()=> {
  return (
     <div className="hidden lg:flex mt-10  justify-between items-center gap-4 ">
          
{/* 1 */}
            <div className="flex  bg-white shadow  items-center justify-center gap-3 p-3 flex-1   rounded-sm">

              <div className="text-red-600 rounded-full border-2 p-1 border-red-600">

              <Truck className="text-red-600"/>
              </div>
              <div>
                <p className="font-bold"> 60 min delivery</p>
            <p> Free shipping over  1300</p></div>
              </div>
{/* 2 */}
            <div className="flex  bg-white shadow  items-center justify-center gap-3 p-3 flex-1   rounded-sm">

              <div className="text-red-600 rounded-full border-2 p-1 border-red-600">

              <ShieldCheck className="text-red-600"/>
              </div>
              <div>
                <p className="font-bold"> Authorized Products</p>
            <p>Exchange within 30 days </p></div>
              </div>
{/* 3 */}
            <div className="flex  bg-white shadow  items-center justify-center gap-3 p-3 flex-1   rounded-sm">

              <div className="text-red-600 rounded-full border-2 p-1 border-red-600">

              <Headphones className="text-red-600" />
              </div>
              <div>
                <p className="font-bold"> Customer Support</p>
            <p>9am to 9pm</p></div>
              </div>
{/* 4 */}
            <div className="flex  bg-white shadow  items-center justify-center gap-3 p-3 flex-1   rounded-sm">

              <div className="text-red-600 rounded-full border-2 p-1 border-red-600">

              <WalletCards className="text-red-600  "/>
              </div>
              <div>
                <p className="font-bold"> Secure Payments</p>
            <p>pay with multiple cards</p></div>
              </div>
           
             </div>
  )
}

export default ServiceHighlights