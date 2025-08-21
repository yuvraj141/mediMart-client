import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/category";
import { getAllProducts } from "@/services/products";

import { ICategory } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts(undefined, undefined, query);
console.log('from appproducts page',products);
  return (
    <NMContainer>
      {/* <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
       */}
      <AllProducts products={products} />
    </NMContainer>
  );
};

export default AllProductsPage;
