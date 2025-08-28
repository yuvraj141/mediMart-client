'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import Image, { StaticImageData } from "next/image";
import defaultImg from '../../../../assets/default.png';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppDispatch } from '@/redux/hooks';
import { addProduct } from '@/redux/features/cartSlice';
import { toast } from 'sonner';

const ProductDetails = ({ product }: { product: TProduct }) => {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(
    product?.images?.[0] || defaultImg
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  const dispatch=useAppDispatch()
  const handleAddProduct = (product: TProduct) => {
    dispatch(addProduct(product));
    toast.success('Product added to cart successfully')
  };
// console.log(product, ' from product details page');
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 transition-all duration-300">
      
      {/* ✅ Left: Product Image Gallery */}
      <div className="flex flex-col items-center">
        
        {/* Main Image */}
        <div className="w-full    max-w-lg">
          <Image
            src={selectedImage}
            alt={product?.name || "Product image"}
            width={300}
            height={200}
            className="w-full h-[200px] border-2  aspect-square object-contain rounded-md shadow-sm"
            priority
          />
        

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {product?.images?.slice(0, 3).map((image: string, idx: number) => (
            <div
              key={idx}
              onClick={() => handleImageClick(image)}
              className={cn(
                "w-[100px] h-[100px] rounded-md border-2 overflow-hidden cursor-pointer transition-all duration-300",
                selectedImage === image
                  ? "border-blue-500"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
              )}
            >
              <Image
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* ✅ Right: Product Information */}
      <div className="flex flex-col gap-4">
        
        {/* Product Title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {product?.name}
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          {product?.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1">
            Brand: <strong>{product?.brand?.name}</strong>
          </span>
          <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1">
            Category: <strong>{product?.category?.name}</strong>
          </span>
          <span className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1">
            Stock:{" "}
            <strong
              className={cn(
                product?.stock > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </strong>
          </span>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Price Section */}
        <div className="flex items-end gap-3">
          {product?.offerPrice ? (
            <>
              <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                ৳{product?.offerPrice}
              </p>
              <del className="text-lg font-semibold text-gray-400 dark:text-gray-500">
                ৳{product?.price}
              </del>
            </>
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ৳{product?.price}
            </p>
          )}
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button onClick={() => handleAddProduct(product)}
            className="flex-1 px-4 py-2 text-base font-semibold rounded-md bg-yellow-400 cursor-pointer hover:bg-yellow-400 text-white shadow-sm transition-transform duration-200 hover:scale-105"
            disabled={product?.stock === 0}
          >
            Add to Cart
          </Button>

          <Link href="/cart" passHref className="flex-1">
            <Button
              className="w-full px-4 py-2 text-base font-semibold rounded-md bg-red-600 cursor-pointer hover:bg-red-600 text-white shadow-sm transition-transform duration-200 hover:scale-105"
              disabled={product?.stock === 0}
            >
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ProductDetails;



//-----------******----------------////
// import { Button } from "@/components/ui/button";
// import { IProduct } from "@/types";

// import Image from "next/image";
// import defaultImg from '../../../../assets/default.png'
// import Link from "next/link";
// const ProductDetails = ({ product }: { product: IProduct }) => {
//   return (
//     <div className="grid grid-cols-2 gap-4 border border-white p-4 rounded-md my-5 shadow-sm">
//       <div>
//         <Image
//           src={product?.images[0] }
//           alt="product image"
//           width={500}
//           height={500}
//           className="rounded-md w-full object-cover h-80"
//         />
//         <div className="grid grid-cols-3 gap-4 mt-5">
//           {product?.images.slice(0, 3).map((image: string, idx: number) => (
//             <Image
//               key={idx}
//               src={image}
//               alt="product image"
//               width={500}
//               height={500}
//               className="rounded-md w-full object-cover h-40"
//             />
//           ))}
//         </div>
//       </div>
//       <div className="bg-white rounded-md p-4">
//         <h2 className="font-bold text-xl mb-4">{product?.name}</h2>
//         <p className="text-justify text-gray-500 font-light text-sm">
//           {product?.description}
//         </p>
//         <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
//           <p className="rounded-full px-4 py-1 bg-gray-100 flex items-center justify-center gap-1">
//           </p>
//           <p className="rounded-full px-4 py-1 bg-gray-100">
//             Stock: {product?.stock>=0 ? (<p className="bg-green-400">In Stock</p>):(
//               <p>out of stock</p>
//             )}
//           </p>
//           <p className="rounded-full px-4 py-1 bg-gray-100">
//             Brand: {product?.brand?.name}
//           </p>
//           <p className="rounded-full px-4 py-1 bg-gray-100">
//             Category: {product?.category?.name}
//           </p>
//         </div>
//         <hr />
//         <p className="my-2 font-bold">
//           Price:{" "}
//           {product?.offerPrice ? (
//             <>
//               <span className="font-semibold mr-2 text-orange-400">
//                 $ {product?.offerPrice}
//               </span>
//               <del className="font-semibold text-xs">$ {product?.price}</del>
//             </>
//           ) : (
//             <span className="font-semibold">$ {product?.price}</span>
//           )}
//         </p>
//         <hr />

//         <Button className="w-full my-5 bg-yellow-500 hover:bg-yellow-600 cursor-pointer">
//           Add To Cart
//         </Button>
//         <Link href={'/cart'} passHref>
//         <Button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer">Buy Now</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
