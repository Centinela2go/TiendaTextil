import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const Pagination = ({ totalPages, handleChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxVisiblePages = 7; // Número máximo de botones visibles

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handleChange(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handleChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      pages = [...Array(totalPages)].map((_, index) => index + 1);
    } else if (currentPage <= halfVisiblePages) {
      // Primer grupo de páginas: desde 1 hasta maxVisiblePages - 1
      pages = [...Array(maxVisiblePages - 1)].map((_, index) => index + 1);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage > totalPages - halfVisiblePages) {
      // Último grupo de páginas: desde totalPages - maxVisiblePages + 2 hasta totalPages
      pages.push(1);
      pages.push("...");
      pages = pages.concat(
        [...Array(maxVisiblePages - 1)].map(
          (_, index) => totalPages - (maxVisiblePages - 2) + index
        )
      );
    } else {
      // Grupo intermedio: desde currentPage - halfVisiblePages + 1 hasta currentPage + halfVisiblePages - 1
      pages.push(1);
      pages.push("...");
      pages = pages.concat(
        [...Array(maxVisiblePages - 4)].map(
          (_, index) => currentPage - (halfVisiblePages - 2) + index
        )
      );
      pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <a
        key={index}
        className={`w-10 h-10 p-2 inline-flex items-center justify-center rounded-full transition-all duration-150 ${
          page === "..."
            ? "text-gray-500"
            : currentPage === page
            ? "bg-indigo-600 text-white"
            : "bg-transparent text-gray-500 hover:text-indigo-600"
        }`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </a>
    ));
  };

  return (
    <nav className="flex items-center gap-x-4 min-w-max">
      <a
        className={`text-gray-500 hover:text-gray-900 p-4 inline-flex items-center ${
          currentPage === 1 ? "hidden" : ""
        }`}
        onClick={handleBack}
      >
        <span className="text-blue-500">
          <ChevronLeftIcon className="h-5 w-5" />
        </span>
      </a>

      {renderPageNumbers()}

      <a
        className={`text-gray-500 hover:text-gray-900 p-4 inline-flex items-center ${
          currentPage === totalPages ? "hidden" : ""
        }`}
        onClick={handleNext}
      >
        <span className="text-blue-500">
          <ChevronRightIcon className="h-5 w-5" />
        </span>
      </a>
    </nav>
  );
};

export default Pagination;
