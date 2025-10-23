import { ErrorMessage, LoadingIndicator } from "@/app/shared/ui";
import { DataDisplayBlockProps } from "./data-display-block.types";
import {
  GridLayout,
  InfiniteScrollLayout,
  ListLayout,
  PaginatedLayout,
} from "./layouts";

export default function DataDisplayBlock<T>({
  data,
  isLoading,
  isError,
  error,
  displayType,
  className,
  testId = "data-display-block",
  loadingText = "Loading...",
  errorMessage = "Error loading data",
  emptyMessage = "No data available",
  renderItem,
  pagination,
  infiniteScroll,
}: DataDisplayBlockProps<T>) {
  if (isLoading) {
    return <LoadingIndicator size="lg" text={loadingText} />;
  }
  if (isError) {
    return <ErrorMessage message={error?.message || errorMessage} />;
  }
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  switch (displayType) {
    case "infinite":
      return (
        <InfiniteScrollLayout
          data={data}
          renderItem={renderItem}
          infiniteScroll={infiniteScroll!}
          className={className}
          testId={testId}
        />
      );

    case "paginated":
      return (
        <PaginatedLayout
          data={data}
          renderItem={renderItem}
          pagination={pagination!}
          className={className}
          testId={testId}
        />
      );

    case "grid":
      return (
        <GridLayout
          data={data}
          renderItem={renderItem}
          className={
            className ||
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          }
          testId={testId}
        />
      );

    case "list":
      return (
        <ListLayout
          data={data}
          renderItem={renderItem}
          className={className || "space-y-4 p-6"}
          testId={testId}
        />
      );

    default:
      return (
        <GridLayout
          data={data}
          renderItem={renderItem}
          className={
            className ||
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          }
          testId={testId}
        />
      );
  }
}
