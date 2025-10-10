import { addBlog } from "@/app/entities/api/blogs";
import { NewBlog } from "@/app/entities/models";
import { useMutation } from "@tanstack/react-query";

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
