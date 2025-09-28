"use client";

import { postsApi } from "@/entities/post/api";
import type { Post } from "@/shared/types";
import type { NewPost } from "@/shared/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../api";

export const postsKeys = {
  all: ["posts"] as const,
  pag: ["postsPag"] as const,
};

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
  });
}

export function usePostsPag(limit: number = 10, page: number = 1) {
  return useQuery<ApiResponse<{ posts: Post[]; total: number }>>({
    queryKey: ["posts", "paginated", { limit, page }],
    queryFn: async ({ queryKey }) => {
      const [, , params] = queryKey as [
        string,
        string,
        { limit: number; page: number }
      ];
      const result = await postsApi.getPostsByPag(params.limit, params.page);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch posts");
      }
      return result;
    },
    staleTime: 1000 * 30,
    placeholderData: (previousData) => previousData,
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
  });
}
