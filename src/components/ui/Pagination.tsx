import Button from './Button';
import ArrowIcon from './icons/ArrowIcon';
import Select from './Select';

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
  const itemsPerPageOptions = [
    { label: '3', value: '3' },
    { label: '9', value: '9' },
    { label: '18', value: '18' },
    { label: '27', value: '27' },
  ];

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

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-6 px-4 py-3 bg-charcoal border border-cream rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-cream">
        <span>Show</span>
        <Select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          options={itemsPerPageOptions}
        />
        <span>per page</span>
      </div>

      <div>
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 rotate-180"
        >
          <ArrowIcon />
        </Button>

        {pageNumbers[0] > 1 && (
          <>
            <Button
              onClick={() => handlePageClick(1)}
              className={`px-3 py-2 ${currentPage === 1 ? 'bg-charcoal-dark text-white' : 'bg-charcoal text-cream border border-gray-300 hover:bg-gray-50'}`}
            >
              1
            </Button>
            {pageNumbers[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 ${
              currentPage === page
                ? 'bg-charcoal-dark text-white'
                : 'bg-charcoal text-cream border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="px-2">...</span>
            )}
            <Button
              onClick={() => handlePageClick(totalPages)}
              className={`px-3 py-2 ${
                currentPage === totalPages
                  ? 'bg-charcoal-dark text-white'
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
          className="px-3 py-2"
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
