"use client";

import { addPost, postsKeys } from "@/app/entities/api/posts";
import { type NewPost } from "@/app/entities/models";
import { handleQueryError } from "@/pkg/libraries/error-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewPost>({
    mutationFn: async (newPost: NewPost) => {
      const result = await addPost(newPost);
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
