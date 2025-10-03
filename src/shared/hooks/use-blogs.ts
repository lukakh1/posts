import { addBlog } from "@/entities/blogs/api";
import { useMutation } from "@tanstack/react-query";
import { NewBlog } from "../types";

export function useAddBlog() {
  return useMutation<void, Error, NewBlog>({
    mutationFn: async (newBlog: NewBlog) => {
      const result = await addBlog(newBlog);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to create blog");
      }
    },
  });
}
