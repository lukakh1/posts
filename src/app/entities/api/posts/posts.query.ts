"use client";

import { handleQueryError } from "@/pkg/utils/error-handler";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { NewPost } from "../../models";
import { addPost } from "./posts.api";
import { postsQueryOptions } from "./posts.query.options";

export { postsQueryOptions };

export function usePosts() {
  return useQuery({
    ...postsQueryOptions.all(),
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "all posts", {
          queryType: "all-posts",
        });
      },
    },
  });
}

export function usePost(id: string) {
  return useQuery({
    ...postsQueryOptions.detail(id),
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "post detail", {
          postId: id,
        });
      },
    },
  });
}

export function usePostsPag(limit: number = 10, page: number = 1) {
  return useQuery({
    ...postsQueryOptions.paginated(limit, page),
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "paginated posts", {
          limit,
          page,
        });
      },
    },
  });
}

export function useInfinitePosts(limit: number = 10) {
  return useInfiniteQuery({
    ...postsQueryOptions.infinite(limit),
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "infinite posts", {
          limit,
          pageCount: "infinite",
        });
      },
    },
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: async (newPost: NewPost) => {
      const result = await addPost(newPost);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to create post");
      }
      return result;
    },
    meta: {
      onError: (error: Error) => {
        handleQueryError(error, "create post", {
          mutationType: "create-post",
        });
      },
    },
  });
}
