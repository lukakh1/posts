import { getPosts } from "@/app/entities/api/posts";
import { Post } from "@/app/entities/models";
import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export async function prefetchInfinitePosts(limit: number = 10) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<ApiResponse<Post[]>>({
    queryKey: ["postsInf"],
    queryFn: ({ pageParam }) =>
      getPosts({
        pageParam: pageParam as number,
        limit,
      }),
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: ApiResponse<Post[]>,
      allPages: ApiResponse<Post[]>[]
    ) => {
      const nextSkip = allPages.length * limit;
      return lastPage.total && nextSkip < lastPage.total
        ? allPages.length
        : undefined;
    },
  });

  return queryClient;
}
