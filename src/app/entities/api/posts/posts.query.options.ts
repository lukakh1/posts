import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getPost, getPosts } from "./posts.api";

const postsKeys = {
  all: ["posts"] as const,
  lists: () => [...postsKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, "detail"] as const,
  detail: (id: string) => [...postsKeys.details(), id] as const,
  infinite: () => [...postsKeys.all, "infinite"] as const,
  paginated: (limit: number, page: number) =>
    [...postsKeys.all, "paginated", { limit, page }] as const,
} as const;

export const postsQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: postsKeys.lists(),
      queryFn: async () => {
        const result = await getPosts();
        if (!result.success) {
          throw new Error(result.error ?? "Failed to fetch posts");
        }
        return result;
      },
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (error.message.includes("4")) return false;
        return failureCount < 2;
      },
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: postsKeys.detail(id),
      queryFn: async () => {
        const result = await getPost(id);
        if (!result.success) {
          throw new Error(result.error ?? "Failed to fetch post");
        }
        return result;
      },
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (error.message.includes("4")) return false;
        return failureCount < 2;
      },
    }),

  paginated: (limit: number = 10, page: number = 1) =>
    queryOptions({
      queryKey: postsKeys.paginated(limit, page),
      queryFn: async () => {
        const result = await getPosts({ limit, page });
        if (!result.success) {
          throw new Error(result.error ?? "Failed to fetch posts");
        }
        return result;
      },
      staleTime: 30_000,
      placeholderData: (previousData) => previousData,
      retry: (failureCount, error) => {
        if (error.message.includes("4")) return false;
        return failureCount < 2;
      },
    }),

  infinite: (limit: number = 10) =>
    infiniteQueryOptions({
      queryKey: postsKeys.infinite(),
      queryFn: async ({ pageParam }) => {
        const result = await getPosts({
          pageParam: pageParam as number,
          limit: limit,
        });
        if (!result.success) {
          throw new Error(result.error ?? "Failed to fetch infinite posts");
        }
        return result;
      },
      getNextPageParam: (lastPage, allPages) => {
        const nextSkip = allPages.length * limit;
        return lastPage.total && nextSkip < lastPage.total
          ? allPages.length
          : undefined;
      },
      initialPageParam: 0,
      staleTime: 30_000,
      retry: (failureCount, error) => {
        if (error.message.includes("4")) return false;
        return failureCount < 2;
      },
    }),
};
