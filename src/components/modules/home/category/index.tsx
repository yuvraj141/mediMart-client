import { getAllCategories } from "@/services/category";

const Category=async()=>{
    const data=await getAllCategories()
    console.log(data.data.result);

    return(
        <div>
            from category
        </div>
    )
}
export default Category