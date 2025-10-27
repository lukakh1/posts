"use client";

import { useInfinitePosts } from "@/app/entities/api/posts";
import { PostCard } from "@/app/features";
import DataDisplayBlock from "@/app/features/data-display-block/data-display-block.component";
import { ErrorMessage, LoadingIndicator } from "@/app/shared/ui";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";

export interface InfinitePostsWidgetProps {
  title?: string;
  description?: string;
  showHeader?: boolean;
}

function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0, rootMargin: "600px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div ref={observerTarget} className="flex justify-center py-8">
      {isFetchingNextPage && (
        <LoadingIndicator size="lg" text="Loading more..." />
      )}
      {!hasNextPage && (
        <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center gap-3">
          <Icon icon="mdi:check-circle" className="text-2xl text-green-500" />
          <p className="text-gray-600 font-medium">
            You&apos;ve reached the end!
          </p>
        </div>
      )}
    </div>
  );
}

export default function InfinitePostsWidget({
  title = "Infinite Posts Feed",
  description = "Scroll down to load more content automatically",
  showHeader = false,
}: InfinitePostsWidgetProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePosts();

  const allPosts = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading && allPosts.length === 0) {
    return <LoadingIndicator size="lg" text="Loading..." />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "Error loading posts"} />;
  }

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-300 to-pink-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {showHeader && (
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
              {title}
            </h1>
            <p className="text-gray-600 text-lg">{description}</p>
          </div>
        )}

        <DataDisplayBlock
          data={allPosts}
          displayType="list"
          testId="infinite-posts"
          className="space-y-6"
          renderItem={(post) =>
            post ? <PostCard key={post.id} post={post} /> : null
          }
        />

        <InfiniteScrollTrigger
          hasNextPage={hasNextPage || false}
          isFetchingNextPage={isFetchingNextPage || false}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}
