"use client";

import { PostCard } from "@/entities/post/ui";
import { useInfinitePosts } from "@/shared/hooks/use-posts";
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
      { threshold: 0.5, rootMargin: "100px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-3">
          <Icon
            icon="svg-spinners:3-dots-scale"
            className="text-5xl text-indigo-600"
          />
          <p className="text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <Icon
            icon="material-symbols:error-outline"
            className="text-6xl text-red-500 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Error Loading Posts
          </h2>
          <p className="text-gray-600 text-center">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
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
            <div className="flex flex-col items-center gap-3">
              <Icon
                icon="svg-spinners:ring-resize"
                className="text-4xl text-indigo-600"
              />
              <p className="text-gray-600 font-medium">Loading more posts...</p>
            </div>
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
