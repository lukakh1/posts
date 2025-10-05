"use client";

import { postsApi } from "@/entities/post/api";
import { handleQueryError } from "@/shared/lib";
import type { NewPost, Post } from "@/shared/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiResponse } from "../api";

export const postsKeys = {
  all: ["posts"] as const,
  pag: ["postsPag"] as const,
  inf: ["postsInf"] as const,
};

export function useInfinitePosts(limit: number = 10) {
  return useInfiniteQuery<ApiResponse<Post[]>>({
    queryKey: postsKeys.inf,
    queryFn: async ({ pageParam }) => {
      const result = await postsApi.getPosts({
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
      const result = await postsApi.getPosts();
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
      const result = await postsApi.getPosts({ limit, page });
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch posts");
      }
      return result;
    },
    staleTime: 1000 * 30,
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

export function useAddPost() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewPost>({
    mutationFn: async (newPost: NewPost) => {
      const result = await postsApi.addPost(newPost);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to create post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
    },
    onError: (error, variables) => {
      handleQueryError(error, ["posts", "mutation", "add"], {
        postTitle: variables.title,
        mutationType: "create",
      });
    },
    retry: 1,
  });
}
