
import CustomSidebar from "@/components/modules/home/customSidebar";
import Footer from "@/components/shared/Footer";

const CommonLayout=async({
  children,
}: {
  children: React.ReactNode;
}) =>{


  return (
    <>
      <CustomSidebar/>
   
       <div className="pt-30 min-h-screen">
             {children}
       </div>

 <div className="w-full ">
    <Footer />
 </div>
   
    </>
  );
}

export default CommonLayout






