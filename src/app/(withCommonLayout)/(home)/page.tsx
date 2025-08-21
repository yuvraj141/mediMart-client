import Category from "@/components/modules/home/category";
import HeroCarousel from "@/components/ui/core/HeroCarousel";
import FlashSale from "@/components/modules/home/FlashSale";
import ServiceHighlights from "@/components/modules/home/serviceHighlights";
import TrendingProducts from "@/components/modules/home/trendingProducts";
import Banner from "@/components/modules/home/banner";
import HomeContent from "@/components/modules/home/home content";
const  Home=async()=>{

    return(
        <div>
          {/* <div className="">

          <Navbar/>
          </div> */}
          {/* <HeroSection/> */}
          <HeroCarousel/>

          <Category/> 

         <ServiceHighlights/>
         
          <FlashSale/>

          <TrendingProducts/>
          {/* <AllProductsPage/> */}
          <Banner/>

          <HomeContent/>
        </div>
    )
}
export default  Home