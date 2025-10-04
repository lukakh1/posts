import { postsApi } from "@/entities/post/api";
import { ApiResponse } from "@/shared/api";
import { getQueryClient } from "@/shared/lib";
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
    queryFn: ({ pageParam }) =>
      postsApi.getPosts({
        pageParam: pageParam as number,
        limit: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ApiResponse<Post[]>,
      allPages: ApiResponse<Post[]>[]
    ) => {
      const nextSkip = allPages.length * 10;
      return lastPage.total && nextSkip < lastPage.total
        ? allPages.length
        : undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfinitePostsFeed />
    </HydrationBoundary>
  );
}
