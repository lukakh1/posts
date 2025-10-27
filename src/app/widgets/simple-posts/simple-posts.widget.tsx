"use client";

import { usePosts } from "@/app/entities/api/posts";
import { DataDisplayBlock, PostCard } from "@/app/features";

export interface SimplePostsWidgetProps {
  className?: string;
  testId?: string;
}

export default function SimplePostsWidget({
  className,
  testId = "simple-posts",
}: SimplePostsWidgetProps) {
  const { data, isLoading, isError } = usePosts();

  if (isLoading) {
    return <div className="text-center py-16">Loading posts...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-500">Error loading posts</div>
    );
  }

  return (
    <DataDisplayBlock
      data={data?.data || []}
      displayType="grid"
      emptyMessage="No posts available"
      testId={testId}
      className={className}
      renderItem={(post) =>
        post ? <PostCard key={post.id} post={post} /> : null
      }
    />
  );
}
