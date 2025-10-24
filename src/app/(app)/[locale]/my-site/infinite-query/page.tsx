import { prefetchInfinitePosts } from "@/app/entities/api/posts";
import { PostsWidget } from "@/app/widgets";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 30;
export const dynamic = "force-static";

export const metadata = {
  title: "Infinite Posts Feed",
  description: "Browse posts with infinite scroll",
};

export default async function PostsPage() {
  const queryClient = await getQueryClient();
  await prefetchInfinitePosts(queryClient, 10);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsWidget
        displayType="infinite"
        title="Infinite Posts Feed"
        description="Scroll down to load more content automatically"
        showHeader={true}
      />
    </HydrationBoundary>
  );
}
