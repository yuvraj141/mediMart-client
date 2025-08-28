import ProductCard from "@/components/ui/core/ProductCard"
import { TMeta, TProduct } from "@/types"
import TablePagination from "@/components/ui/core/MMTable/TablePagination";

const AllProducts=({
  products,
  meta,
}: {
  products: TProduct[];
  meta: TMeta;
})=>{
console.log(products,'all products page');
    return(
      <div>
        <div className="w-full px-4 max-w-screen-2xl mx-auto flex gap-8 my-10">
       {/* <div className="w-full max-w-sm">
          <FilterSidebar/> 
       </div> */}
     
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {products?.map((product: TProduct, idx: number) => (
      <ProductCard key={idx} product={product} />
    ))}
  </div>
 </div>
{
  meta?.totalPage>1 &&(
     <TablePagination totalPage={meta?.totalPage} />
  )
}
      </div>
    )
}
export default AllProducts