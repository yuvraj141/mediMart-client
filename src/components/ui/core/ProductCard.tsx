"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TProduct } from "@/types"
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addProduct, incrementOrderQuantity, decrementOrderQuantity, removeProduct } from "@/redux/features/cartSlice"

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  // We need to use the selector to check if the product is in the cart
  const cartProducts = useAppSelector((state) => state.cart.products);

  const productInCart = cartProducts.find(
    (item) => item._id === product._id
  );
  const isProductInCart = !!productInCart;
  const productQuantity = productInCart?.orderQuantity || 0;

  // The addProduct reducer expects the full product object.
  const handleAddProduct = () => {
    // This check prevents accidental double-dispatches from adding the product twice.
    if (!isProductInCart) {
      dispatch(addProduct(product));
    }
  };
  
  // The incrementOrderQuantity reducer expects the product ID.
  const handleIncrementQuantity = () => {
    dispatch(incrementOrderQuantity(product._id));
  };
  
  // The decrementOrderQuantity and removeProduct reducers expect the product ID.
  const handleDecrementQuantity = () => {
    // This logic correctly determines whether to decrement or remove the product
    if (productQuantity === 1) {
      dispatch(removeProduct(product._id));
    } else {
      dispatch(decrementOrderQuantity(product._id));
    }
  };

  return (
    <Card className="flex flex-col h-full p-3 border rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]">
      <CardHeader className="relative p-0 h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden">
        <Link href={`/products/${product?._id}`} passHref>
          <Image
            src={product?.images[0] || "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
            width={500}
            height={500}
            alt="product image"
            className="rounded-t-lg h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        {product?.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
        {product?.offerPrice && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -
            {(((product.price - product.offerPrice) / product.price) * 100).toFixed(0)}
            %
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0 mt-3">
        <Link href={`/products/${product?._id}`} passHref>
          <CardTitle title={product?.name} className="font-semibold cursor-pointer text-sm line-clamp-2">
            {product?.name}
          </CardTitle>
        </Link>
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

      <CardFooter className="p-0 mt-auto">
        <div className="w-full">
          {isProductInCart ? (
            <div className="flex items-center justify-between w-full gap-2">
              <Button onClick={handleDecrementQuantity} variant="outline" size="sm" className="flex-1">
                <Minus size={16} />
              </Button>
              <span className="mx-2 font-semibold text-lg">{productQuantity}</span>
              <Button onClick={handleIncrementQuantity} size="sm" className="flex-1 bg-red-500 text-white hover:bg-red-600">
                <Plus size={16} />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddProduct}
              disabled={product?.stock === 0}
              size="sm"
              className="w-full bg-red-500 text-white hover:bg-red-600"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
};

export default ProductCard;
