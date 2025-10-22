"use client";

import { useInfinitePosts } from "@/app/entities/api/posts";
import { ErrorMessage, LoadingIndicator } from "@/app/shared/ui";
import { PostCard } from "@/app/widgets";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";

export default function InfinitePostsFeed() {
  const observerTarget = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePosts();

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

  if (isLoading) {
    return <LoadingIndicator size="lg" text="Loading infinite posts..." />;
  }

  if (isError) {
    return (
      <ErrorMessage message={error?.message || "Unknown error occurred"} />
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-300 to-pink-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
            Infinite Posts Feed
          </h1>
          <p className="text-gray-600 text-lg">
            Scroll down to load more content automatically
          </p>
        </div>

        {allPosts.length > 0 && (
          <div className="space-y-6">
            {allPosts.map((post) => (
              <PostCard key={post!.id} post={post!} />
            ))}
          </div>
        )}

        <div ref={observerTarget} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <LoadingIndicator size="lg" text="Loading more posts..." />
          )}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center gap-3">
              <Icon
                icon="mdi:check-circle"
                className="text-2xl text-green-500"
              />
              <p className="text-gray-600 font-medium">
                Youve reached the end!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
