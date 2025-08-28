import ProductBanner from "@/components/modules/products/banner"
import ProductDetails from "@/components/modules/products/productDetails"
import NMContainer from "@/components/ui/core/NMContainer"
import { getSingleProduct } from "@/services/products"

const ProductDetailsPage=async({params}:{
  params: Promise<{ productId: string }>;
})=>{

const {productId}=await params

const {data:product}=await getSingleProduct(productId)
// console.log('from parent productdetails pafe',product);
return (
    <NMContainer className="">
 {/* <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      /> */}
      <ProductDetails product={product}/>
    </NMContainer>
)
}
export default ProductDetailsPage