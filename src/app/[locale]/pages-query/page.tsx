import { postsApi } from "@/entities/post/api";
import { getQueryClient } from "@/shared/lib";
import { PostPagePagination } from "@/widgets/post-pagination";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 30;

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const currentPage = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const limit = 8;

  const queryClient = getQueryClient();

  const prefetchPromises = [];
  for (let i = 0; i < 4; i++) {
    const pageToFetch = currentPage + i;
    prefetchPromises.push(
      queryClient.prefetchQuery({
        queryKey: ["posts", "paginated", { limit, page: pageToFetch }],
        queryFn: async () => {
          const result = await postsApi.getPosts({ limit, page: pageToFetch });
          if (!result.success) {
            throw new Error(result.error ?? "Failed to fetch posts");
          }
          return result;
        },
        staleTime: 1000 * 30,
      })
    );
  }

  await Promise.all(prefetchPromises);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPagePagination />
    </HydrationBoundary>
  );
}
