import { getPosts } from "@/app/entities/api/posts";
import { handlePrefetchError } from "@/pkg/libraries/error-handler";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export async function prefetchPaginatedPosts(
  currentPage: number,
  limit: number
) {
  const queryClient = getQueryClient();

  const prefetchPromises: Promise<unknown>[] = [];

  for (let i = 0; i < 4; i++) {
    const pageToFetch = currentPage + i;

    prefetchPromises.push(
      queryClient
        .prefetchQuery({
          queryKey: ["posts", "paginated", { limit, page: pageToFetch }],
          queryFn: async () => {
            try {
              const result = await getPosts({
                limit,
                page: pageToFetch,
              });
              if (!result.success) {
                throw new Error(result.error ?? "Failed to fetch posts");
              }
              return result;
            } catch (error) {
              handlePrefetchError(error, ["posts", "paginated"], {
                limit,
                page: pageToFetch,
                currentPage,
                prefetchIndex: i,
              });
              throw error;
            }
          },
          staleTime: 1000 * 30,
        })
        .catch((error) => {
          console.error(`Failed to prefetch page ${pageToFetch}:`, error);
        })
    );
  }

  await Promise.all(prefetchPromises);

  return queryClient;
}
