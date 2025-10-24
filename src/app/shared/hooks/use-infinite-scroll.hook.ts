"use client";
import { useEffect, useRef } from "react";

export interface InfiniteScrollConfig {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

export interface InfiniteScrollActions {
  fetchNextPage: () => void;
}

export interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  title = "Infinite Feed",
  description = "Scroll down to load more content automatically",
  showHeader = true,
}: UseInfiniteScrollProps) {
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

  const config: InfiniteScrollConfig = {
    hasNextPage,
    isFetchingNextPage,
    title,
    description,
    showHeader,
  };

  const actions: InfiniteScrollActions = {
    fetchNextPage,
  };

  return { config, actions, observerTarget };
}
