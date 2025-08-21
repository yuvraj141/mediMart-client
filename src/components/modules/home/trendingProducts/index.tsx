import { Button } from "@/components/ui/button";
import NMContainer from "@/components/ui/core/NMContainer";

import Link from "next/link";

import CarouselCard from "@/components/ui/core/CarouselCard";

import { getTrendingProducts } from "@/services/products";
import { Flame } from "lucide-react";

const TrendingProducts = async () => {
  const { data: products } = await getTrendingProducts();
// console.log(products,' for trending products');
  return (
    <div className=" bg-white bg-opacity-50 pt-6 pb-8">
      <NMContainer className="">
        <div className="   ">
           <div className=" flex items-center justify-center text-center">
            <h2 className="text-xl py-4 font-bold  text-center">Trending This Week  </h2>
            <p className="pl-3"><Flame className="text-red-500" /></p>
            {/* <CountDown /> */}
          </div> 
</div>

            <CarouselCard products={products} />
          
      </NMContainer>
    </div>
  );
};

export default TrendingProducts;
