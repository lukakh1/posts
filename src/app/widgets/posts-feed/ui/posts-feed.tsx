"use client";
import { usePosts } from "@/app/entities";
import { HeroPostCard, PostCard } from "@/app/features";
import { ErrorMessage, LoadingIndicator } from "@/app/shared/ui";

interface PostsFeedProps {
  postCardType: number;
}

export default function PostsFeed({ postCardType }: PostsFeedProps) {
  const { data, isPending, isError } = usePosts();

  if (isPending) return <LoadingIndicator size="lg" text="Loading posts..." />;
  if (isError) return <ErrorMessage message="Error loading posts" />;

  return (
    <div
      data-testid="post-data"
      className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {postCardType === 0
        ? data?.data?.map((post) => <PostCard key={post.id} post={post} />)
        : data?.data?.map((post) => <HeroPostCard key={post.id} post={post} />)}
    </div>
  );
}
