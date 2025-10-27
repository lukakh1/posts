import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { QueryClient } from "@tanstack/react-query";
import { Post } from "../../models";
import { postsQueryOptions } from "./posts.query.options";

export async function prefetchAllPosts(queryClient: QueryClient) {
  return await queryClient.prefetchQuery(postsQueryOptions.all());
}

export async function prefetchPostDetail(queryClient: QueryClient, id: string) {
  return await queryClient.prefetchQuery(postsQueryOptions.detail(id));
}

export async function prefetchPaginatedPosts(
  queryClient: QueryClient,
  limit: number = 10,
  page: number = 1
) {
  return await queryClient.prefetchQuery(
    postsQueryOptions.paginated(limit, page)
  );
}

export async function prefetchInfinitePosts(
  queryClient: QueryClient,
  limit: number = 10
) {
  return await queryClient.prefetchInfiniteQuery(
    postsQueryOptions.infinite(limit)
  );
}

export async function getPostIdsForStaticParams(): Promise<string[]> {
  try {
    const queryClient = await getQueryClient();
    const result = await queryClient.fetchQuery(postsQueryOptions.all());

    if (!result.success || !result.data) {
      console.warn("Failed to fetch posts for static params:", result.error);
      return [];
    }

    return result.data.map((post) => String(post.id));
  } catch (error) {
    console.error("Error fetching post IDs for static params:", error);
    return [];
  }
}

export async function getPrefetchedPostFromCache(
  queryClient: QueryClient,
  id: string
) {
  const result = queryClient.getQueryData(
    postsQueryOptions.detail(id).queryKey
  ) as ApiResponse<Post> | undefined;

  if (!result || !result.success) {
    return null;
  }

  return result.data;
}

export async function prefetchSinglePost(id: string) {
  const queryClient = await getQueryClient();
  await prefetchPostDetail(queryClient, id);
  return queryClient;
}
