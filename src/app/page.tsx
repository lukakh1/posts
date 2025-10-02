import { postsApi } from "@/entities/post/api";
import { getGB } from "@/shared/lib";
import { getQueryClient } from "@/shared/lib/react-query/get-query-client";
import { GBProvider } from "@/shared/providers";
import { PostsFeed } from "@/widgets/posts-feed/ui";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const revalidate = 30;

export default async function Home() {
  const attributes = {
    id: "7",
  };

  const gb = getGB({ attributes });
  await gb.init();

  const postDisplay = gb.getFeatureValue("post-display", true);
  const postCardType = gb.getFeatureValue("post-card-style", 0);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
    staleTime: 30 * 1000,
  });

  return (
    <GBProvider payload={gb.getDecryptedPayload()} attributes={attributes}>
      <h1 className="text-4xl font-bold text-center mt-8 text-slate-100">
        Welcome to the Posts!
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        Discover amazing content and share your thoughts.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {postDisplay && <div>posts should be displayed</div>}
        <PostsFeed postCardType={postCardType} />
      </HydrationBoundary>
    </GBProvider>
  );
}
