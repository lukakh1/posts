"use client";

import { LoadingIndicator } from "@/app/shared/ui";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { InfiniteScrollTriggerProps } from "../data-display-block.types";

export function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollTriggerProps) {
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
