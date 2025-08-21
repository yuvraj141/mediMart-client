'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {ShoppingCart} from 'lucide-react'
import {Button} from "@/components/ui/button"
import NMContainer from "@/components/ui/core/NMContainer";

import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

const CarouselCard=({products}:{products:TProduct[]})=>{

   const dispatch = useAppDispatch();

  const handleAddProduct = (product: TProduct) => {
    dispatch(addProduct(product));
  };

   

    return(
       <NMContainer className="" >
       
<Carousel opts={{ align: "start" }} className="w-full mx-auto">
  <CarouselContent>
    {products.map((product) => (
     <CarouselItem
  key={product?._id}
  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 h-[320px] sm:h-[350px] lg:h-[400px]"
>
  <Card className="flex flex-col h-full p-3">
    {/* Image */}
    <CardHeader className="relative p-0 h-36 sm:h-40 md:h-44 lg:h-48">
      <Image
        src={
          product?.images[0] ||
          "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
        }
        width={400}
        height={400}
        alt="product image"
        className="rounded-sm w-full h-full object-cover"
      />
      {product?.stock === 0 && (
        <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
          Out of Stock
        </div>
      )}
    </CardHeader>

    {/* Content */}
    <CardContent className=" flex-1 p-0">
      <Link href={`/products/${product?._id}`} passHref>
        <CardTitle
          title={product?.name}
          className="font-semibold cursor-pointer text-sm whitespace-nowrap overflow-hidden"
        >
          {product?.name.length > 20
            ? product?.name?.slice(0, 20) + "..."
            : product?.name}
        </CardTitle>
      </Link>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {product?.offerPrice ? (
            <>
              <span className="font-semibold mr-2 text-red-400">
                <span className="text-xl">৳ </span>
                {product?.offerPrice.toFixed(2)}
              </span>
              <del className="font-semibold text-xs">
                <span className="text-xl">৳ </span>
                {product?.price.toFixed(2)}
              </del>
            </>
          ) : (
            <span className="font-semibold text-red-500">
              <span className="text-xl">৳ </span>
              {product?.price.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </CardContent>

    {/* Footer */}
    <div className="p-0  ">
      <div className="flex gap-2 items-center justify-between w-full">
        <Button
          disabled={product?.stock === 0}
          size="sm"
          variant="outline"
          className="w-2/3 hover:bg-red-600 hover:text-white cursor-pointer"
        >
          Buy Now
        </Button>
        <Button
          onClick={() => handleAddProduct(product)}
          disabled={product?.stock === 0}
          variant="outline"
          size="sm"
          className="p-0 flex items-center justify-center rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
        >
          <ShoppingCart />
        </Button>
      </div>
    </div>
  </Card>
</CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious className="left-1" />
  <CarouselNext className="right-1" />
</Carousel>


      
       </NMContainer>
    )
}
export default CarouselCard



// ////-------*****//// default 
{/* <Carousel opts={{ align: "start" }} className="w-full mx-auto  ">
  <CarouselContent className="">

       
   {products.map((product) => (
            <CarouselItem key={product?._id} className=" basis-1/3  md:basis-1/4 lg:basis-1/5 ">
              <Card className="p-3">
      <CardHeader className="relative p-0 h-48">
        <Image
          src={
            product?.images[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={400}
          height={400}
          alt="product image"
          className="rounded-sm h-48 object-cover"
        />
        {product?.stock === 0 && (
          <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      <CardContent className=" p-0 ">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle
            title={product?.name}
            className="font-semibold cursor-pointer text-sm"
          >
            {product?.name.length > 20
              ? product?.name?.slice(0, 20) + "..."
              : product?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
            {product?.offerPrice ? (
              <>
                <span className="font-semibold mr-2 text-red-400">
                  <span className="text-xl">৳ </span> {product?.offerPrice.toFixed(2)}
                </span>
                <del className="font-semibold text-xs">
                  <span className="text-xl">৳ </span> {product?.price.toFixed(2)}
                </del>
              </>
            ) : (
              <span className="font-semibold text-red-500">
                <span className="text-xl">৳ </span>
                  {product?.price.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
          <Button
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="w-2/3 hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Buy Now
          </Button>
          {/* <Button
            disabled={product?.stock === 0}
            size="sm"
            variant="outline"
            className="w-32 hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Buy Now
          </Button> */}
//           <Button
//             onClick={() => handleAddProduct(product)}
//             disabled={product?.stock === 0}
//             variant="outline"
//             size="sm"
//             className=" p-0 flex items-center justify-center rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
//           >
//             <ShoppingCart className=" " />
//           </Button>
        
//         </div>
//       </CardFooter>
//     </Card>
//             </CarouselItem>
//           ))}

//   </CarouselContent>
//   <CarouselPrevious className="left-1" />
//   <CarouselNext className="right-1" />
// </Carousel> */}


///**********---------- *////////
// import { CardContent } from "@/components/ui/card";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import {Flame} from 'lucide-react'
// import NMContainer from "@/components/ui/core/NMContainer";
// import { getAllCategories } from "@/services/category";
// import { ICategory, TProduct } from "@/types";
// import Image from "next/image";
// import Link from "next/link";

// const CarouselCard=async({products}:{products:TProduct[]})=>{

//     const {data:categories}=await getAllCategories()
   

//     return(
//        <NMContainer className="" >
//         {/* <div >
//         <h2 className="text-xl flex font-bold mb-5 text-center">Flash <span className="text-red-600">Sales <Flame/></span></h2>
//       </div> */}

// <Carousel opts={{ align: "start" }} className="w-full mx-auto  ">
//   <CarouselContent className="">

       
//    {products.map((product) => (
//             <CarouselItem key={product._id} className="basis-1/2 md:basis-1/4 lg:basis-1/5">
//               <div className="p-1">
//                 <Link href={`/products?category=${product._id}`} passHref>
//                   <CardContent className="text-center font-bold">
//                     <div className="h-48 w-48 text-center">
//                       <Image
//                         src={product?.images[0]}
//                         alt={product.name}
//                         width={100}
//                         height={100}
//                         className="w-full h-full"
//                       />
//                     </div>
//                     <h3>{product?.offerPrice}</h3>
//                     <span className="font-semibold">{product?.name}</span>
//                   </CardContent>
//                 </Link>
//               </div>
//             </CarouselItem>
//           ))}

//   </CarouselContent>
//   <CarouselPrevious className="left-1" />
//   <CarouselNext className="right-1" />
// </Carousel>
      
//        </NMContainer>
//     )
// }
// export default CarouselCard