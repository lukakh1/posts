import { Blog, getBlogs } from "@/app/entities";
import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import type { QueryClient } from "@tanstack/react-query";

export async function prefetchBlogs() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ApiResponse<Blog[]>>({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
    staleTime: 30_000,
  });
  return queryClient;
}

export function getPrefetchedBlogs(queryClient: QueryClient) {
  const cached = queryClient.getQueryData<ApiResponse<Blog[]>>(["blogs"]);
  return cached?.data ?? [];
}
