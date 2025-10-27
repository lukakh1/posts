interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  hasPrev,
  hasNext,
  disabled = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={onFirst}
        disabled={!hasPrev || disabled}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>

      <button
        onClick={onPrevious}
        disabled={!hasPrev || disabled}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex space-x-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum =
            Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
          if (pageNum > totalPages) return null;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={disabled}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!hasNext || disabled}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>

      <button
        onClick={onLast}
        disabled={!hasNext || disabled}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </div>
  );
}

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export function PaginationWrapper({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  hasPrev,
  hasNext,
  disabled = false,
  children,
}: PaginationWrapperProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {children}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPrevious={onPrevious}
        onNext={onNext}
        onFirst={onFirst}
        onLast={onLast}
        hasPrev={hasPrev}
        hasNext={hasNext}
        disabled={disabled}
      />
    </>
  );
}
