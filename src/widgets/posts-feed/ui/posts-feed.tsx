"use client";
import { postsApi } from "@/entities/post/api";
import { PostCard } from "@/entities/post/ui";
import { Post } from "@/shared/types";
import { Error, Loader } from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";

export default function PostsFeed({ posts }: { posts?: Post[] }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
    refetchOnWindowFocus: false,
    refetchInterval: 30000,
  });

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
