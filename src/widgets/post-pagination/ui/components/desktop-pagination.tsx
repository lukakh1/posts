import { Icon } from "@iconify/react";
import { PaginationButton } from "./pagination-button";

interface DesktopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export const DesktopPagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageSelect,
  hasPrev,
  hasNext,
  disabled = false,
}: DesktopPaginationProps) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="hidden sm:flex items-center gap-1">
      <PaginationButton
        onClick={onPrevious}
        disabled={!hasPrev || disabled}
        className="mr-2"
      >
        <Icon icon="mdi:chevron-left" className="w-5 h-5" />
        <span className="ml-1 hidden md:inline">Previous</span>
      </PaginationButton>

      {getPageNumbers().map((pageNum, idx) => (
        <div key={idx}>
          {pageNum === "..." ? (
            <span className="px-3 py-2 text-slate-500">...</span>
          ) : (
            <PaginationButton
              onClick={() => onPageSelect(pageNum as number)}
              active={pageNum === currentPage}
              disabled={disabled}
            >
              {pageNum}
            </PaginationButton>
          )}
        </div>
      ))}

      <PaginationButton
        onClick={onNext}
        disabled={!hasNext || disabled}
        className="ml-2"
      >
        <span className="mr-1 hidden md:inline">Next</span>
        <Icon icon="mdi:chevron-right" className="w-5 h-5" />
      </PaginationButton>
    </div>
  );
};
