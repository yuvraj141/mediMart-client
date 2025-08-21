import AllProducts from '@/components/modules/products';
import ProductBanner from '@/components/modules/products/banner';
import NMContainer from '@/components/ui/core/NMContainer';
import ProductCard from '@/components/ui/core/ProductCard';
import { getFlashSaleProducts } from '@/services/flashSale';
import { TProduct } from '@/types';
import React from 'react'
import img from '../../../assets/productsBannerImg/massiveSavings.jpeg'
const FlashSalePage=async()=> {
    const { data: products } = await getFlashSaleProducts();
  return (
   <NMContainer>
      <ProductBanner img={img.src} title="" path="" />

      <h2 className="text-2xl text-center font-bold my-7">Flash <span className='text-red-500'>Sales</span> </h2>
     
      <div className="w-full px-4 max-w-screen-2xl mx-auto flex gap-8 my-10">
     
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {products?.map((product: TProduct, idx: number) => (
      <ProductCard key={idx} product={product} />
    ))}
  </div>
</div>
    </NMContainer>
  )
}

export default FlashSalePage