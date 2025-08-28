import AllProducts from "@/components/modules/products";

import NMContainer from "@/components/ui/core/NMContainer";

import { getAllProducts } from "@/services/products";

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
   const { page } = await searchParams;
  const query = await searchParams;
  const { data: products,meta } = await getAllProducts(page, '20', query);
console.log('from allProducts page',meta);
  return (
    <NMContainer>
      {/* <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
       */}
        
      <AllProducts products={products} meta={meta} />
    </NMContainer>
  );
};

export default AllProductsPage;
// const AllProductsPage = async ({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }) => {
//   const query = await searchParams;

//   // const { data: categories } = await getAllCategories();
//   const { data: products,meta } = await getAllProducts(undefined, undefined, query);
// console.log('from allProducts page',meta);
//   return (
//     <NMContainer>
//       {/* <ProductBanner title="All Products" path="Home - Products" />
//       <h2 className="text-xl font-bold my-5">Featured Collection </h2>
//        */}
        
//       <AllProducts products={products} meta={meta} />
//     </NMContainer>
//   );
// };

// export default AllProductsPage;
