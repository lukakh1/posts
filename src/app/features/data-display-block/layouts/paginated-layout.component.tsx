import { Pagination, PaginationStats } from "../components";
import { PaginatedLayoutProps } from "../data-display-block.types";

export function PaginatedLayout<T>({
  data,
  renderItem,
  pagination,
  className,
  testId,
}: PaginatedLayoutProps<T>) {
  return (
    <div className="p-6">
      <PaginationStats
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
      />

      <div
        data-testid={testId}
        className={
          className || "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {data.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>

      <Pagination {...pagination} />
    </div>
  );
}
