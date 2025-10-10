import { PagesQueryModule, prefetchPaginatedPosts } from "@/app/modules";
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
  const queryClient = await prefetchPaginatedPosts(currentPage, limit);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PagesQueryModule />
    </HydrationBoundary>
  );
}
