import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";

import Link from "next/link";
import CountDown from "./CountDown";
import { getFlashSaleProducts } from "@/services/flashSale";
import CarouselCard from "@/components/ui/core/CarouselCard";
import {Flame} from 'lucide-react'

const FlashSale = async () => {
  const { data: products } = await getFlashSaleProducts();
// console.log(products,' fro flash sale');
  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <NMContainer className="mt-8">
        <div className="flex pt-5  items-center justify-between ">
           <div className="text-center">
            <h2 className="text-xl font-bold  py-3 text-center">Flash<span className="text-red-600">Sales </span></h2>
            {/* <CountDown /> */}
          </div> 
<div className="">
<Link href="/flashSale">
            <Button variant="outline" className="rounded-full border-red-500 hover:cursor-pointer hover:bg-red-500  hover:text-white">
             View All 
            </Button>  
          </Link>
</div>
          
        </div>

            <CarouselCard products={products} />
          
      </NMContainer>
    </div>
  );
};

export default FlashSale;
