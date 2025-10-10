import { InfiniteQueryModule, prefetchInfinitePosts } from "@/app/modules";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Infinite Posts Feed",
  description: "Browse posts with infinite scroll",
};

export default async function PostsPage() {
  const queryClient = await prefetchInfinitePosts(10);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfiniteQueryModule />
    </HydrationBoundary>
  );
}
