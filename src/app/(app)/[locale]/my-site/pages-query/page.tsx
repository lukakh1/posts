import { prefetchPaginatedPosts } from "@/app/entities/api/posts";
import { PostsWidget } from "@/app/widgets";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 30;
export const dynamic = "force-static";

interface PageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const currentPage = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const limit = 8;
  const queryClient = await getQueryClient();
  await prefetchPaginatedPosts(queryClient, limit, currentPage);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsWidget displayType="paginated" />
    </HydrationBoundary>
  );
}
