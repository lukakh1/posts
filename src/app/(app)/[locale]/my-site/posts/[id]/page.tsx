import {
  getPostsForStaticParams,
  getPrefetchedPostFromCache,
  prefetchSinglePost,
} from "@/app/entities/api/posts/posts-service";
import { Post } from "@/app/entities/models";
import { PostCard } from "@/app/features";
import { SlugProps } from "@/app/shared";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 30;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPostsForStaticParams();
  return posts.map((post: Post) => ({ id: String(post.id) }));
}
export default async function Page({ params }: SlugProps) {
  const { id } = await params;
  const queryClient = await prefetchSinglePost(id);
  const post = getPrefetchedPostFromCache(queryClient, id);
  if (!post) notFound();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full">
        <PostCard post={post} showRead={false} />
      </div>
    </HydrationBoundary>
  );
}
