import { CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/category";
import { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Category=async()=>{
    const {data:categories}=await getAllCategories()
   

    return(
       <NMContainer className="" >
        <div className=" text-center mt-10 ">
        <h2 className="text-2xl  font-bold mb-5">Featured Category</h2>
      </div>

<Carousel opts={{ align: "start" }} className="w-full mx-auto">
  <CarouselContent className="">
    {categories?.map((category: ICategory, idx: number) => (
      <CarouselItem key={idx} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
        <Link href={`/products?category=${category._id}`} passHref>
          <CardContent className="h-40 flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition-transform duration-300 transform group hover:scale-105">
            <div className="h-24 w-24 rounded-full overflow-hidden mb-2">
              <Image
                src={category?.imgIcon}
                alt="category"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-center text-sm group-hover:font-bold">
              {category?.name}
            </span>
          </CardContent>
        </Link>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-1" />
  <CarouselNext className="right-1" />
</Carousel>

{/* ---------***** */}
{/* <Carousel opts={{ align: "start" }} className="w-full mx-auto  ">
  <CarouselContent className="">

    {categories?.map((category: ICategory, idx: number) => (
       
      <CarouselItem key={idx} className=' basis-1/2  md:basis-1/4 lg:basis-1/6  '>
        <div className="p-1  ">
      <Link href={`/products?category=${category._id}`}passHref>
        <CardContent className="  text-center font-bold ">
        <div className="h-24 w-24  text-center ">
          <Image src={category?.imgIcon} alt="category" width={100} height={100} className="w-full h-full "/>
        </div>
          
         <div className="text-center border-2 ">
            <span className=" font-bold mt-2">{category?.name}</span>
         </div>
        </CardContent></Link>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-1" />
  <CarouselNext className="right-1" />
</Carousel>
       */}
       </NMContainer>
    )
}
export default Category