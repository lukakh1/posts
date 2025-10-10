import { Icon } from "@iconify/react";

interface PaginationNavigationProps {
  currentPage: number;
  totalPages: number;
  onFirst: () => void;
  onLast: () => void;
}

export const PaginationNavigation = ({
  currentPage,
  totalPages,
  onFirst,
  onLast,
}: PaginationNavigationProps) => {
  if (currentPage === 1 && currentPage === totalPages) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-xs text-slate-500">
      {currentPage > 1 && (
        <button
          onClick={onFirst}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <Icon icon="mdi:page-first" className="w-4 h-4" />
          First
        </button>
      )}
      {currentPage < totalPages && (
        <button
          onClick={onLast}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Last
          <Icon icon="mdi:page-last" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
