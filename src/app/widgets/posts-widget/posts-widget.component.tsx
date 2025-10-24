"use client";

import {
  useInfinitePosts,
  usePosts,
  usePostsPag,
} from "@/app/entities/api/posts";
import { DataDisplayBlock, PostCard } from "@/app/features";
import { useInfiniteScroll, usePagination } from "@/app/shared";
import { handleQueryError } from "@/pkg/utils/error-handler";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type PostsDisplayType = "paginated" | "infinite" | "simple";

export interface PostsWidgetProps {
  displayType: PostsDisplayType;
  title?: string;
  description?: string;
  showHeader?: boolean;
  className?: string;
  testId?: string;
}

export default function PostsWidget({
  displayType,
  title = "Posts Feed",
  description = "Browse posts",
  showHeader = false,
  className,
  testId = "posts-widget",
}: PostsWidgetProps) {
  if (displayType === "paginated") {
    return <PaginatedPosts />;
  }

  if (displayType === "infinite") {
    return (
      <InfinitePosts
        title={title}
        description={description}
        showHeader={showHeader}
      />
    );
  }

  return <SimplePosts className={className} testId={testId} />;
}

function PaginatedPosts() {
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = 6;

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

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0;
  const { config: paginationConfig, actions: paginationActions } =
    usePagination({
      totalPages,
      totalItems: data?.total || 0,
      disabled: isPending,
    });

  return (
    <DataDisplayBlock
      data={data?.data}
      isLoading={isPending}
      isError={isError}
      error={error}
      displayType="paginated"
      loadingText="Loading posts..."
      errorMessage="Error loading posts"
      emptyMessage="No posts available"
      testId="paginated-posts"
      renderItem={(post) =>
        post ? <PostCard key={post.id} post={post} /> : null
      }
      pagination={{
        ...paginationConfig,
        ...paginationActions,
      }}
    />
  );
}

function InfinitePosts({
  title,
  description,
  showHeader,
}: {
  title: string;
  description: string;
  showHeader: boolean;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePosts();

  const { config: infiniteConfig, actions: infiniteActions } =
    useInfiniteScroll({
      hasNextPage: hasNextPage || false,
      isFetchingNextPage: isFetchingNextPage || false,
      fetchNextPage,
      title,
      description,
      showHeader,
    });

  const allPosts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <DataDisplayBlock
      data={allPosts}
      isLoading={isLoading}
      isError={isError}
      error={error}
      displayType="infinite"
      loadingText="Loading infinite posts..."
      errorMessage="Error loading posts"
      emptyMessage="No posts available"
      testId="infinite-posts"
      renderItem={(post) =>
        post ? <PostCard key={post.id} post={post} /> : null
      }
      infiniteScroll={{
        ...infiniteConfig,
        ...infiniteActions,
      }}
    />
  );
}

function SimplePosts({
  className,
  testId,
}: {
  className?: string;
  testId: string;
}) {
  const { data, isLoading, isError, error } = usePosts();

  return (
    <DataDisplayBlock
      data={data?.data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      displayType="grid"
      loadingText="Loading posts..."
      errorMessage="Error loading posts"
      emptyMessage="No posts available"
      testId={testId}
      className={className}
      renderItem={(post) =>
        post ? <PostCard key={post.id} post={post} /> : null
      }
    />
  );
}
