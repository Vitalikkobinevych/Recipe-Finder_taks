import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageRange = () => {
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageRange = getPageRange();

  const renderPageButton = (
    pageNumber,
    label,
    isActive = false,
    isDisabled = false
  ) => {
    return (
      <button
        key={`page-${pageNumber}`}
        onClick={() => onPageChange(pageNumber)}
        disabled={isDisabled}
        className={`px-3 py-1 mx-1 rounded ${
          isActive
            ? 'bg-blue-600 text-white'
            : isDisabled
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-100'
        } border`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex justify-center items-center">
      {/* Кнопка "Попередня" */}
      {renderPageButton(currentPage - 1, '←', false, currentPage === 1)}

      {/* Кнопка першої сторінки, якщо не видно */}
      {pageRange[0] > 1 && (
        <>
          {renderPageButton(1, '1')}
          {pageRange[0] > 2 && <span className="mx-1">...</span>}
        </>
      )}

      {/* Кнопки сторінок */}
      {pageRange.map((pageNumber) =>
        renderPageButton(pageNumber, pageNumber, pageNumber === currentPage)
      )}

      {/* Кнопка останньої сторінки, якщо не видно */}
      {pageRange[pageRange.length - 1] < totalPages && (
        <>
          {pageRange[pageRange.length - 1] < totalPages - 1 && (
            <span className="mx-1">...</span>
          )}
          {renderPageButton(totalPages, totalPages)}
        </>
      )}

      {/* Кнопка "Наступна" */}
      {renderPageButton(
        currentPage + 1,
        '→',
        false,
        currentPage === totalPages
      )}
    </div>
  );
};

export default Pagination;
