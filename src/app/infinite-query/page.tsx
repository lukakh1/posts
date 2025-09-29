import { postsApi } from "@/entities/post/api";
import { ApiResponse } from "@/shared/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { Post } from "@/shared/types";
import { InfinitePostsFeed } from "@/widgets/posts-infinite";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Infinite Posts Feed",
  description: "Browse posts with infinite scroll",
};

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<ApiResponse<Post[]>>({
    queryKey: ["postsInf"],
    queryFn: ({ pageParam }) => postsApi.getInfinitePosts(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.data || lastPage.data.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
    pages: 2,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfinitePostsFeed />
    </HydrationBoundary>
  );
}
