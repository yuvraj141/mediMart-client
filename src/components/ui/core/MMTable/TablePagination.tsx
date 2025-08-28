'use client'
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ always get current page from URL (fallback to 1)
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage - 1));
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(currentPage + 1));
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center gap-2 my-5">
      {/* Prev */}
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowLeft />
      </Button>

      {/* Page Numbers */}
      {[...Array(totalPage)].map((_, index) => (
        <Button
          key={index}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(index + 1));
            router.push(`${pathname}?${params.toString()}`);
          }}
          size="sm"
          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
            ${currentPage === index + 1 
              ? "bg-red-500 text-white hover:bg-red-500" 
              : "bg-white text-black border hover:bg-white"}
          `}
        >
          {index + 1}
        </Button>
      ))}

      {/* Next */}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant="outline"
        size="sm"
        className="w-8 h-8 rounded-full flex items-center justify-center"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;








// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Button } from "../../button";
// import { useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// const TablePagination = ({ totalPage }: { totalPage: number }) => {
//   console.log(totalPage,' : total page number');
//   // console.log(typeof totalPage);
//   // const [currentPage, setCurrentPage] = useState(1);
//    // Get current page from query params (default to 1)
//    const searchParams = useSearchParams();

// const currentPage = Number(searchParams.get("page")) || 1;
//     console.log(currentPage);

//   const router = useRouter();
//   const pathname = usePathname();

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       // setCurrentPage(currentPage - 1);
//       router.push(`${pathname}?page=${currentPage - 1}`);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPage) {
//       // setCurrentPage(currentPage + 1);
//       router.push(`${pathname}?page=${currentPage + 1}`);
//     }
//   };

//   return (
//     <div className=" mt-10  flex items-center justify-center gap-2 my-5">
//       <Button
//         onClick={handlePrev}
//         disabled={currentPage === 1}
//         variant="outline"
//         size="sm"
//         className="w-8 h-8 rounded-full flex items-center justify-center"
//       >
//         <ArrowLeft />
//       </Button>
//       {[...Array(totalPage)].map((_, index) => (
//         <Button
//           onClick={() => {
//             // setCurrentPage(index + 1);
//             router.push(`${pathname}?page=${index + 1}`);
//           }}
//           key={index}
//           // variant={currentPage === index + 1 ? "default" : "outline"}
//           size="sm"
//            className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center 
//     ${currentPage === index + 1 ? "bg-red-500 text-white hover:bg-red-500" : "bg-white text-black border hover:bg-white" }`}
//         >
//           {index + 1}
//         </Button>
//       ))}
//       <Button
//         onClick={handleNext}
//         disabled={currentPage === totalPage}
//         variant="outline"
//         size="sm"
//         className="w-8 h-8 rounded-full flex items-center justify-center"
//       >
//         <ArrowRight />
//       </Button>
//     </div>
//   );
// };

// export default TablePagination;
