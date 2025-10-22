import { Icon } from "@iconify/react";

interface PaginationStatsProps {
  total: number;
  currentPage: number;
  totalPages: number;
  currentPageCount: number;
}

export const PaginationStats = ({
  total,
  currentPage,
  totalPages,
  currentPageCount,
}: PaginationStatsProps) => {
  return (
    <div className="bg-slate-300 border border-slate-200 rounded-lg px-4 py-3">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:file-document-outline" className="w-4 h-4" />
            <span>Total: {total} posts</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:page-layout-body" className="w-4 h-4" />
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Showing {currentPageCount} results
        </div>
      </div>
    </div>
  );
};
