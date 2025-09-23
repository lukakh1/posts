import { postsApi } from "@/entities/post/api";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { PostsFeed } from "@/widgets/posts-feed/ui";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const revalidate = 30;

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
    staleTime: 30 * 1000,
  });

  // const posts = await postsApi.getPosts();
  return (
    <div className="max-w-7xl mx-auto w-full h-full">
      <h1 className="text-4xl font-bold text-center mt-8">
        Welcome to the Posts!
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        Discover amazing content and share your thoughts.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <PostsFeed posts={posts.data} /> */}
        <PostsFeed />
      </HydrationBoundary>
    </div>
  );
}
