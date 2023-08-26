import React from "react";

function PaginationControls({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
  perPage,
  setPerPage,
  setIsLoading,
}) {
  const getTotalPages = () => {
    if (perPage === 0) {
      return Math.ceil(totalItems / itemsPerPage);
    }

    return Math.ceil(totalItems / perPage);
  };

  console.log(getTotalPages());

  const handlePreviousPage = () => {
    if (currentPage > 1) {
        setIsLoading(true)
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setItemsPerPage(itemsPerPage - 10);
        setPerPage(perPage - 10);
        setIsLoading(false)
      }, 2000);
    }
  };

  const handleNextPage = () => {
    if (currentPage < getTotalPages()) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setPerPage(perPage + 10);
        setItemsPerPage(itemsPerPage + 10);
        setIsLoading(false)
      }, 2000);
    }
  };

  return (
    <div className="mt-16 w-fit mx-auto">
      <button
        className="bg-[rgb(28,82,132)] w-[100px] text-white px-3 py-1.5 rounded mr-2 disabled:bg-gray-400 transition"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-500">
        Page {currentPage} of {getTotalPages()}
      </span>
      <button
        className="bg-[rgb(28,82,132)] w-[100px] text-white px-3 py-1.5 rounded ml-2 disabled:bg-gray-400 transition"
        onClick={handleNextPage}
        disabled={currentPage === getTotalPages()}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
