import { InfiniteScrollTrigger } from "../components";
import { InfiniteScrollLayoutProps } from "../data-display-block.types";

export function InfiniteScrollLayout<T>({
  data,
  renderItem,
  infiniteScroll,
  className,
  testId,
}: InfiniteScrollLayoutProps<T>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-300 to-pink-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {infiniteScroll.showHeader && (
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
              {infiniteScroll.title || "Infinite Feed"}
            </h1>
            <p className="text-gray-600 text-lg">
              {infiniteScroll.description ||
                "Scroll down to load more content automatically"}
            </p>
          </div>
        )}

        <div data-testid={testId} className={className || "space-y-6"}>
          {data.map((item, index) => (
            <div key={index}>{renderItem(item, index)}</div>
          ))}
        </div>

        <InfiniteScrollTrigger
          hasNextPage={infiniteScroll.hasNextPage}
          isFetchingNextPage={infiniteScroll.isFetchingNextPage}
          fetchNextPage={infiniteScroll.fetchNextPage}
        />
      </div>
    </div>
  );
}
