import ProductCard from "@/components/ui/core/ProductCard"
import { TProduct } from "@/types"
import FilterSidebar from "./filterSidebar"

const AllProducts=({products}:{products:TProduct[]})=>{

    return(
      <div className="w-full px-4 max-w-screen-2xl mx-auto flex gap-8 my-10">
       {/* <div className="w-full max-w-sm">
          <FilterSidebar/> 
       </div> */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {products?.map((product: TProduct, idx: number) => (
      <ProductCard key={idx} product={product} />
    ))}
  </div>
</div>
    )
}
export default AllProducts