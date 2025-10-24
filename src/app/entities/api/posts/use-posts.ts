"use client";

import { ApiResponse } from "@/app/shared/types";
import { handleQueryError } from "@/pkg/utils/error-handler";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Post } from "../../models";
import { getPosts } from "./post-api";

export const postsKeys = {
  all: ["posts"] as const,
  pag: ["postsPag"] as const,
  inf: ["postsInf"] as const,
};

export function useInfinitePosts(limit: number = 10) {
  return useInfiniteQuery<ApiResponse<Post[]>>({
    queryKey: postsKeys.inf,
    queryFn: async ({ pageParam }) => {
      const result = await getPosts({
        pageParam: pageParam as number,
        limit: limit,
      });
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch infinite posts");
      }
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * limit;
      return lastPage.total && nextSkip < lastPage.total
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "infinite posts", {
          limit,
          pageCount: "infinite",
        });
      },
    },
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}

export function usePosts() {
  return useQuery<ApiResponse<Post[]>>({
    queryKey: postsKeys.all,
    queryFn: async () => {
      const result = await getPosts();
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch posts");
      }
      return result;
    },
    staleTime: 30_000,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "all posts", {
          queryType: "all-posts",
        });
      },
    },
    retry: (failureCount, error) => {
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}

export function usePostsPag(limit: number = 10, page: number = 1) {
  return useQuery<ApiResponse<Post[]>>({
    queryKey: ["posts", "paginated", { limit, page }],
    queryFn: async () => {
      const result = await getPosts({ limit, page });
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch posts");
      }
      return result;
    },
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, ["posts", "paginated"], {
          limit,
          page,
        });
      },
    },
    retry: (failureCount, error) => {
      if (error.message.includes("4")) return false;
      return failureCount < 2;
    },
  });
}
