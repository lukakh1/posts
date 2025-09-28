import { DesktopPagination } from "./desktop-pagination";
import { MobilePagination } from "./mobile-pagination";
import { PaginationNavigation } from "./pagination-navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
  onFirst: () => void;
  onLast: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  disabled?: boolean;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageSelect,
  onFirst,
  onLast,
  hasPrev,
  hasNext,
  disabled = false,
}: PaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        disabled={disabled}
      />

      <DesktopPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPrevious}
        onNext={onNext}
        onPageSelect={onPageSelect}
        hasPrev={hasPrev}
        hasNext={hasNext}
        disabled={disabled}
      />

      <PaginationNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onFirst={onFirst}
        onLast={onLast}
      />
    </div>
  );
};
