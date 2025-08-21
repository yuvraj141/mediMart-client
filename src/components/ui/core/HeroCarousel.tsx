"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import img1 from '../../../assets/carousel/681b31444627ed704a817a7b_668681ca0b15b6fc211b0d4f_aci banner DESKTOP_1552.jpeg'
import img2 from '../../../assets/carousel/68652497aa6937f200b72f5c_wishlist_Banner_DESKTOP_1552.jpeg'
import img3 from '../../../assets/carousel/68823118d56ece365af6ba1d_uniliver banner_desktop_1552.jpeg'
import img4 from '../../../assets/carousel/689435cd232ffedf92f9457f_bkash_Banner_DESKTOP_1552.webp'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NMContainer from "@/components/ui/core/NMContainer"
import Image from "next/image"
export default function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
   
  <NMContainer className=" mx-2 mt-5">
      <Carousel 
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="  "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="">
        
          <CarouselItem >
            <div className="">
                  
               <Image src={img1} alt="banner"className=" w-full h-auto object-cover"/>
               
            
            </div>
          </CarouselItem>

          <CarouselItem >
            <div className=''>  
               <Image src={img2} alt="banner" className=" w-full h-auto object-cover"/>
            </div>
          </CarouselItem>
          <CarouselItem >
            <div className=''>  
               <Image src={img3} alt="banner" className=" w-full h-auto object-cover"/>
            </div>
          </CarouselItem>
          <CarouselItem >
            <div className=''>  
               <Image src={img4} alt="banner"className=" w-full h-auto object-cover"/>
            </div>
          </CarouselItem>
       
      </CarouselContent>
      <CarouselPrevious className="hidden md:left-1" />
      <CarouselNext className="hidden md:right-1"/>
    </Carousel>
  </NMContainer>
 
  )
}
