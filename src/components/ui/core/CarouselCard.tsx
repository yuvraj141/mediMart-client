'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Minus, Plus, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import NMContainer from "@/components/ui/core/NMContainer";

import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { addProduct, decrementOrderQuantity, incrementOrderQuantity, removeProduct } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

const CarouselCard = ({ products }: { products: TProduct[] }) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.products);

  const handleAddProduct = (product: TProduct) => {
    dispatch(addProduct(product));
    toast.success('Product added to cart successfully')
  };

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    const productInCart = cartProducts.find(item => item._id === id);

    if (productInCart && productInCart.orderQuantity > 1) {
      dispatch(decrementOrderQuantity(id));
    } else {
      dispatch(removeProduct(id));
    }
  };

  return (
    <NMContainer className="" >
      <Carousel opts={{ align: "start" }} className="w-full mx-auto">
        <CarouselContent className="-ml-4">
          {products.map((product,index) => {
            const isProductInCart = cartProducts.find(item => item._id === product._id);
            const isInStock = product?.stock > 0;
            return (
              <CarouselItem
                key={product?._id ||`product-${index}`}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Card className="flex flex-col h-full p-3 border rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
                  <Link href={`/products/${product?._id}`} passHref>
                    <CardHeader className="relative p-0 h-48 sm:h-52 md:h-56 lg:h-56 overflow-hidden ">
                      <Image
                        src={
                          product?.images[0] ||
                          "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                        }
                        width={500}
                        height={500}
                        alt="product image"
                        className="rounded-t-lg h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {!isInStock && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Out of Stock
                        </div>
                      )}
                      {product?.offerPrice && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{(((product.price - product.offerPrice) / product.price) * 100).toFixed(0)}%
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1 p-0 mt-3">
                      <CardTitle title={product?.name} className="font-semibold cursor-pointer text-sm line-clamp-2">
                        {product?.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-2 flex-1">
                        <span className="font-bold text-red-500 text-lg mr-1">
                          <span className="text-md">৳</span> {product?.offerPrice?.toFixed(2) || product?.price?.toFixed(2)}
                        </span>
                        {product?.offerPrice && (
                          <del className="text-xs text-gray-400">
                            <span className="text-sm">৳</span> {product?.price?.toFixed(2)}
                          </del>
                        )}
                      </p>
                    </CardContent>
                  </Link>
                  <CardFooter className="p-0 mt-auto">
                    <div className="w-full">
                      {isProductInCart ? (
                        <div className="flex items-center justify-between w-full gap-2">
                          <Button onClick={() => handleDecrementQuantity(product?._id)} variant="outline" size="sm" className="flex-1 cursor-pointer">
                            <Minus size={16} />
                          </Button>
                          <span className="mx-2 font-semibold text-lg">{isProductInCart?.orderQuantity}</span>
                          <Button onClick={() => handleIncrementQuantity(product?._id)} size="sm" className="flex-1 bg-red-500 cursor-pointer text-white hover:bg-red-600">
                            <Plus size={16} />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleAddProduct(product)}
                          disabled={!isInStock}
                          size="sm"
                          className="w-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-1" />
        <CarouselNext className="right-1" />
      </Carousel>
    </NMContainer>
  );
}

export default CarouselCard;




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