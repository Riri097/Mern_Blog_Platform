const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        ← Prev
      </button>

      {/* First Page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 text-sm border rounded-lg hover:bg-gray-100 transition"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 text-sm border rounded-lg transition ${
            currentPage === pageNum
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Last Page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 text-sm border rounded-lg hover:bg-gray-100 transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;