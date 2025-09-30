"use client";
import { PostCard } from "@/entities/post/ui";
import { mixpanel } from "@/shared/api";
import { usePosts } from "@/shared/hooks/use-posts";
import { Post } from "@/shared/types";
import { Error, Loader } from "@/shared/ui";
import { useEffect } from "react";

export default function PostsFeed({ posts }: { posts?: Post[] }) {
  useEffect(() => {
    mixpanel.track("Page Viewed", {
      page: "Home",
    });
  }, []);
  const { data, isPending, isError } = usePosts();

  if (isPending) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))} */}
      {data?.data?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
