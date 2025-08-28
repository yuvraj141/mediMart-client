import Image from 'next/image'
import React from 'react'
import img1 from '../../../../assets/carousel/meat.jpeg'
import img2 from '../../../../assets/carousel/chocolate.jpg'
import img3 from '../../../../assets/carousel/banner.jpeg'
import fish from '../../../../assets/carousel/fish.jpeg'
import NMContainer from '@/components/ui/core/NMContainer'
import Link from 'next/link'
import { getAllCategories } from '@/services/category'

const Banner=async()=> {
    const {data:categories}=await getAllCategories()
     const selectedCategories = categories?.filter((cat: any) =>
    ["Fish", "Meat", "Frozen"].includes(cat.name)
  );
  //  console.log(categories);
  return (
    <NMContainer>
<div className="flex gap-2">
  {/* Left child - 50% width */}
  <div className="">
    <div className="mb-2">
      <Link href={`/products?category=${selectedCategories.find((c:any)=>c.name==="Meat")?._id}`} passHref>
      <Image src={img1} alt="meat" className=" " />
      </Link>
    </div>
    <div className="">
      <Link href={`/products?category=${selectedCategories.find((c:any)=>c.name==="Fish")?._id}`}>
      <Image src={fish} alt="chocolate" className=" " />
      </Link>
    </div>
  </div>

  {/* Right child - 50% width */}
  <div className="">
  <Link href={`/products?category=${selectedCategories.find((c:any)=>c.name==="Frozen")?._id}`} passHref>
    <Image src={img3} alt="snacks" className=" h-full" />
  </Link>
  </div>
</div>
    </NMContainer>
    
  )
}

export default Banner