"use client";
import { PostCard } from "@/entities/post/ui";
import HeroPostCard from "@/entities/post/ui/post-card/heroUI/hero-post-card";
import { usePosts } from "@/shared/hooks/use-posts";
import { Post } from "@/shared/types";
import { Error, Loader } from "@/shared/ui";

interface PostsFeedProps {
  posts?: Post[];
  postCardType: number;
}

export default function PostsFeed({ posts, postCardType }: PostsFeedProps) {
  const { data, isPending, isError } = usePosts();

  if (isPending) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {postCardType === 0
        ? data?.data?.map((post) => <PostCard key={post.id} post={post} />)
        : data?.data?.map((post) => <HeroPostCard key={post.id} post={post} />)}
    </div>
  );
}
