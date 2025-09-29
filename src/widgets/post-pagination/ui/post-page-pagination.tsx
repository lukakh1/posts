"use client";
import { postsApi } from "@/entities/post/api";
import { usePostsPag } from "@/shared/hooks/use-posts";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ErrorMessage,
  LoadingIndicator,
  PaginationControls,
  PaginationStats,
  PostsGrid,
} from "./components";

export default function PostPagePagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = 8;

  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    usePostsPag(limit, page);

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const prefetchNextPages = async (currentPage: number) => {
    const prefetchThreshold = 2;

    if (hasNextPage && totalPages - currentPage <= prefetchThreshold) {
      const prefetchPromises = [];

      for (let i = 1; i <= 3; i++) {
        const pageToFetch = currentPage + i;
        if (pageToFetch <= totalPages) {
          prefetchPromises.push(
            queryClient.prefetchQuery({
              queryKey: ["posts", "paginated", { limit, page: pageToFetch }],
              queryFn: async () => {
                const result = await postsApi.getPostsByPag(limit, pageToFetch);
                if (!result.success) {
                  throw new Error(result.error ?? "Failed to fetch posts");
                }
                return result;
              },
              staleTime: 1000 * 30,
            })
          );
        }
      }

      if (prefetchPromises.length > 0) {
        await Promise.all(prefetchPromises);
      }
    }
  };

  const updateURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const goToPage = (targetPage: number) => {
    if (targetPage >= 1 && targetPage <= totalPages && targetPage !== page) {
      updateURL(targetPage);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      const newPage = page - 1;
      updateURL(newPage);
    }
  };

  const nextPage = async () => {
    if (hasNextPage) {
      const newPage = page + 1;
      updateURL(newPage);
      await prefetchNextPages(newPage);
    }
  };

  const goToFirst = () => goToPage(1);
  const goToLast = () => goToPage(totalPages);

  console.log(data, "datunia data2");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm">
          {isFetching && (
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <LoadingIndicator size="sm" text="Loading..." />
            </div>
          )}
        </div>
      </div>

      {data?.data && (
        <div className="mb-6">
          <PaginationStats
            total={data.total || 0}
            currentPage={page}
            totalPages={totalPages}
            currentPageCount={data.data.length || 0}
          />
        </div>
      )}

      {isPending ? (
        <div className="text-center py-16">
          <LoadingIndicator size="lg" text="Loading posts..." />
        </div>
      ) : isError ? (
        <ErrorMessage message={error?.message || "Unknown error occurred"} />
      ) : data?.data ? (
        <PostsGrid
          posts={data.data || []}
          isPlaceholderData={isPlaceholderData}
        />
      ) : null}

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPrevious={prevPage}
        onNext={nextPage}
        onPageSelect={goToPage}
        onFirst={goToFirst}
        onLast={goToLast}
        hasPrev={hasPrevPage}
        hasNext={hasNextPage}
        disabled={isPending}
      />
    </div>
  );
}
