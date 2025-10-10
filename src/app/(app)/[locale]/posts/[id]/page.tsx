import { Post, SlugProps } from "@/app/entities/models";
import {
  PostsModule,
  getPostsForStaticParams,
  getPrefetchedPostFromCache,
  prefetchSinglePost,
} from "@/app/modules";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export const dynamic = "force-static";

export const revalidate = 30000;

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
      <PostsModule post={post} />
    </HydrationBoundary>
  );
}
