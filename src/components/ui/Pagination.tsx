import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // if (totalPages <= 1) {
  //   return null;
  // }

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>per page</span>
      </div>

      <div className="text-sm text-gray-700">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm"
        >
          Previous
        </Button>

        {pageNumbers[0] > 1 && (
          <>
            <Button
              onClick={() => handlePageClick(1)}
              className={`px-3 py-2 text-sm ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            >
              1
            </Button>
            {pageNumbers[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 text-sm ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <Button
              onClick={() => handlePageClick(totalPages)}
              className={`px-3 py-2 text-sm ${
                currentPage === totalPages
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
