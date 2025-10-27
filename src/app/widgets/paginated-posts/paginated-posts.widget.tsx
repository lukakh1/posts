"use client";

import { postsQueryOptions, usePostsPag } from "@/app/entities/api/posts";
import { PostCard } from "@/app/features";
import DataDisplayBlock from "@/app/features/data-display-block/data-display-block.component";
import { usePagination } from "@/app/shared";
import {
  ErrorMessage,
  LoadingIndicator,
  PaginationWrapper,
} from "@/app/shared/ui";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { handleQueryError } from "@/pkg/utils/error-handler";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaginatedPostsWidget() {
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = 6;
  const queryClient = getQueryClient();

  const { isPending, isError, data, error } = usePostsPag(limit, page);

  useEffect(() => {
    if (isError && error) {
      handleQueryError(error, ["posts", "paginated", "render"], {
        page,
        limit,
        errorType: "render-error",
      });
    }
  }, [isError, error, page, limit]);

  useEffect(() => {
    if (data?.total) {
      const totalPages = Math.ceil(data.total / limit);
      const nextPage = page + 1;

      if (nextPage <= totalPages && page >= 1) {
        queryClient.prefetchQuery(postsQueryOptions.paginated(limit, nextPage));
      }
    }
  }, [page, data, limit, queryClient]);

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;
  const { config: paginationConfig, actions: paginationActions } =
    usePagination({
      totalPages,
      totalItems: data?.total || 0,
      disabled: isPending,
    });

  if (isPending) {
    return <LoadingIndicator size="lg" text="Loading..." />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "Error loading posts"} />;
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts available</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PaginationWrapper
        {...paginationConfig}
        {...paginationActions}
        itemsPerPage={limit}
      >
        <DataDisplayBlock
          data={data.data}
          displayType="grid"
          testId="paginated-posts"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          renderItem={(post) =>
            post ? <PostCard key={post.id} post={post} /> : null
          }
        />
      </PaginationWrapper>
    </div>
  );
}
