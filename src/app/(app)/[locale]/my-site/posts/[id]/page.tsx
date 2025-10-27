import {
  getPostIdsForStaticParams,
  getPrefetchedPostFromCache,
  prefetchPostDetail,
} from "@/app/entities/api/posts";
import { PostCard } from "@/app/features";
import { SlugProps } from "@/app/shared";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 30;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const postIds = await getPostIdsForStaticParams();

  return postIds.map((id) => ({
    id: id,
  }));
}
export default async function Page({ params }: SlugProps) {
  const { id } = await params;
  const queryClient = await getQueryClient();
  await prefetchPostDetail(queryClient, id);
  const post = await getPrefetchedPostFromCache(queryClient, id);
  if (!post) notFound();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <PostCard post={post} showRead={false} />
      </div>
    </HydrationBoundary>
  );
}
