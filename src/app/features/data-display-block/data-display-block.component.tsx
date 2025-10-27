import { ReactNode } from "react";

export type DataDisplayType = "grid" | "list";

export interface DataDisplayBlockProps<T> {
  data: T[];
  displayType: DataDisplayType;
  className?: string;
  testId?: string;
  emptyMessage?: string;
  renderItem: (item: T, index: number) => ReactNode;
}

export default function DataDisplayBlock<T>({
  data,
  displayType,
  className,
  testId = "data-display-block",
  emptyMessage = "No data available",
  renderItem,
}: DataDisplayBlockProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  if (displayType === "list") {
    return (
      <div data-testid={testId} className={className || "space-y-4 p-6"}>
        {data.map((item, index) => (
          <div key={index}>{renderItem(item, index)}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      className={
        className || "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      }
    >
      {data.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}
