import { Post, getPost, getPosts } from "@/app/entities";
import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import type { QueryClient } from "@tanstack/react-query";

export async function prefetchPostsList() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ApiResponse<Post[]>>({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    staleTime: 30_000,
  });
  return queryClient;
}

export async function prefetchSinglePost(id: string) {
  const queryClient = getQueryClient();

  await prefetchPostsList();

  await queryClient.prefetchQuery<ApiResponse<Post>>({
    queryKey: ["posts", "detail", id],
    queryFn: () => getPost(id),
    staleTime: 30_000,
  });
  return queryClient;
}

export async function getPostsForStaticParams(): Promise<Post[]> {
  const queryClient = await prefetchPostsList();
  const cached = queryClient.getQueryData<ApiResponse<Post[]>>(["posts"]);
  return cached?.data ?? [];
}

export function getPrefetchedPostFromCache(
  queryClient: QueryClient,
  id: string
): Post | null {
  const cached = queryClient.getQueryData<ApiResponse<Post>>([
    "posts",
    "detail",
    id,
  ]);
  return cached?.data ?? null;
}
