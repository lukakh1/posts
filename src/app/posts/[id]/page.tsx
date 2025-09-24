import { postsApi } from "@/entities/post/api";
import { PostContent } from "@/entities/post/ui";
import { SlugProps } from "@/shared/types";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export const dynamic = "force-static";

export const revalidate = 30000;

export async function generateStaticParams() {
  const posts = await postsApi.getPosts();

  return posts.data?.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({ params }: SlugProps) {
  const { id } = await params;
  const { data: post } = await postsApi.getPost(id);
  if (!post) {
    notFound();
  }
  return (
    <div className="w-full">
      <PostContent post={post} />
    </div>
  );
}
