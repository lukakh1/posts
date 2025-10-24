import {
  getPostIdsForStaticParams,
  getPrefetchedPostFromCache,
  prefetchSinglePost,
} from "@/app/entities/api/posts";
import { PostCard } from "@/app/features";
import { SlugProps } from "@/app/shared";
import PostModal from "@/app/shared/ui/modal/modal";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 30;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const postIds = await getPostIdsForStaticParams();
  return postIds.map((id: number) => ({ id }));
}

export default async function Page({ params }: SlugProps) {
  const { id } = await params;
  const queryClient = await prefetchSinglePost(id);
  const post = await getPrefetchedPostFromCache(queryClient, id);
  if (!post) notFound();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostModal>
        <div className="w-full">
          <PostCard post={post} showRead={false} />
        </div>
      </PostModal>
    </HydrationBoundary>
  );
}
