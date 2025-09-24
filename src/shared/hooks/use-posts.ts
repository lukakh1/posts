"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/entities/post/api";
import type { Post } from "@/shared/types";
import type { NewPost } from "@/shared/types/post";
import { ApiResponse } from "../api";

export const postsKeys = {
  all: ["posts"] as const,
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
