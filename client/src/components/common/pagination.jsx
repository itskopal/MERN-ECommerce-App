import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center space-x-2">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-sm px-3 py-1 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          className={`text-sm px-3 py-1 rounded-md mx-1 transition-colors duration-200 ${
            currentPage === number
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-100 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {number}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-sm px-3 py-1 flex items-center justify-center rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination;

// import React from "react";
// import { Button } from "../ui/button";

// function Pagination({ currentPage, totalPages, onPageChange }) {
//   // Create an array of page numbers
//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );

//   return (
//     <div className="pagination">
//       {pageNumbers.map((number) => (
//         <Button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`mx-1 ${
//             currentPage === number ? "bg-blue-500" : "bg-gray-300"
//           }`}
//         >
//           {number}
//         </Button>
//       ))}
//     </div>
//   );
// }

// export default Pagination;
