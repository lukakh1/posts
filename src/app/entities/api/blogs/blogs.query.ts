import { useMutation } from "@tanstack/react-query";
import { NewBlog } from "../../models";
import { addBlog } from "./blogs.api";

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
