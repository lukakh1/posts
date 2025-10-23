import { useMutation } from "@tanstack/react-query";
import { NewPost } from "../../models";
import { addPost } from "./post-api";

export function useCreatePost() {
  return useMutation<void, Error, NewPost>({
    mutationFn: async (newPost: NewPost) => {
      const result = await addPost(newPost);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to create post");
      }
    },
  });
}
