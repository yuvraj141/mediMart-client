import { Button } from '@/components/ui/button';
import CarouselCard from '@/components/ui/core/CarouselCard';
import NMContainer from '@/components/ui/core/NMContainer';
import { getAllCategories } from '@/services/category';
import { getAllProducts } from '@/services/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import frozen from '../../../../assets/carousel/Frozen.jpeg'
const HomeContent=async()=> {
    const {data:products}=await getAllProducts()
    const {data:categories}=await getAllCategories()


    //chocolateCategory
const chocolateCategory = categories.find(
  (cat: any) => cat?.name === "Chocolate"
);
const frozenCategory = categories.find(
  (cat: any) => cat?.name === "Frozen"
);
const fruitsCategory = categories.find(
  (cat: any) => cat?.name === "Fruits"
);
const meatCategory = categories.find(
  (cat: any) => cat?.name === "Meat"
);
const dairyCategory = categories.find(
  (cat: any) => cat?.name === "Dairy"
);
const coffeeCategory = categories.find(
  (cat: any) => cat?.name === "coffee"
);

const { data: frozenItems } = await getAllProducts(undefined, undefined, { category: frozenCategory?._id })
const { data: fruitItems } = await getAllProducts(undefined, undefined, { category: fruitsCategory?._id })
const { data: meatItems } = await getAllProducts(undefined, undefined, { category: meatCategory?._id })
const { data: dairyItems } = await getAllProducts(undefined, undefined, { category: dairyCategory?._id })
const { data: coffeeItems } = await getAllProducts(undefined, undefined, { category: coffeeCategory?._id })

     const chocolates = products.filter(
    (p: any) => p?.category?.name ==="Chocolate"
  );
 
// console.log(frozenItems,'forzen items');
   return (
    
      <NMContainer className=" bg-white bg-opacity-50 pt-6 pb-8" >

        {/* Chocolates and Candy */}
        <div className="   ">
           <div className=" flex justify-between">
            <h2 className="text-xl py-4 font-bold  text-center">Chocolates and Candy </h2>
            <Link href={`/products?category=${chocolateCategory?._id}`} passHref>
            <Button variant="outline" className="rounded-full border-red-500 hover:cursor-pointer hover:bg-red-500  hover:text-white">
             View All 
            </Button> 
            </Link>
        
          </div> 
</div>

            <CarouselCard products={chocolates} />
{/* Coffee */}
        <div className="   ">
           <div className=" flex justify-center">
            <h2 className="text-xl py-8 font-bold  text-center">Coffee </h2>
        
          </div>
           <CarouselCard products={coffeeItems} /> 
</div>
 {/* superSavings and frozen items */}
<div className='flex flex-col lg:flex-row mt-10 gap-3  overflow-x-hidden'>

  {/* first child */}
  <div className='w-full lg:w-1/3  relative'>
    <Image className='w-full h-auto object-cover' src={frozen} alt='frozen' />
    
    {/* overlay text */}
    <p className='absolute bottom-4 left-1/2 -translate-x-1/2 text-black bg-yellow-500 border-2 rounded-full py-1.5 px-4 font-bold z-10'>
      Daily Necessities
    </p>
  </div>

  {/* second child */}
  <div className='w-full lg:w-2/3 p-5 '>
    <CarouselCard products={frozenItems} />
  </div>

</div>

{/* fresh fruits */}
        <div className="   ">
           <div className=" flex justify-center">
            <h2 className="text-xl py-8 font-bold  text-center">Fresh And Healthy Fruits </h2>
            {/* <Link href={`/products?category=${fruitsCategory?._id}`} passHref>
            <Button variant="outline" className="rounded-full border-red-500 hover:cursor-pointer hover:bg-red-500  hover:text-white">
             View All 
            </Button> 
            </Link> */}
        
          </div>
           <CarouselCard products={fruitItems} /> 
</div>
{/* raw meat */}
        <div className="   ">
           <div className=" flex justify-center">
            <h2 className="text-xl py-8 font-bold  text-center">Fresh Raw Meat </h2>
        
          </div>
           <CarouselCard products={meatItems} /> 
</div>
{/* Dairy Items */}
        <div className="   ">
           <div className=" flex justify-center">
            <h2 className="text-xl py-8 font-bold  text-center">Dairy & UHT Milk </h2>
        
          </div>
           <CarouselCard products={dairyItems} /> 
</div>
   </NMContainer>
   
  );
}

export default HomeContent