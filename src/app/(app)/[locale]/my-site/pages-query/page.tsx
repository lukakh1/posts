import { prefetchPosts } from "@/app/entities/api/posts";
import { PostsWidget } from "@/app/widgets";
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
  const queryClient = await prefetchPosts({ page: currentPage, limit });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsWidget displayType="paginated" />
    </HydrationBoundary>
  );
}
