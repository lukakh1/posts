"use client";
import { postsApi } from "@/entities/post/api";
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
    <div>
      {/* {posts?.map((post) => (
        <div key={post.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))} */}
      {data?.data?.map((post) => (
        <div key={post.id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
