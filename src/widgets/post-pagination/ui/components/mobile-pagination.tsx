import { Icon } from "@iconify/react";
import { PaginationButton } from "./pagination-button";

interface MobilePaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export const MobilePagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  hasPrev,
  hasNext,
  disabled = false,
}: MobilePaginationProps) => {
  return (
    <div className="flex items-center gap-2 sm:hidden">
      <PaginationButton
        onClick={onPrevious}
        disabled={!hasPrev || disabled}
        className="flex-1"
      >
        <Icon icon="mdi:chevron-left" className="w-5 h-5 mr-1" />
        Previous
      </PaginationButton>

      <div className="px-4 py-2 text-sm text-slate-600 bg-slate-50 rounded-lg min-w-[80px] text-center">
        {currentPage} / {totalPages}
      </div>

      <PaginationButton
        onClick={onNext}
        disabled={!hasNext || disabled}
        className="flex-1"
      >
        Next
        <Icon icon="mdi:chevron-right" className="w-5 h-5 ml-1" />
      </PaginationButton>
    </div>
  );
};
