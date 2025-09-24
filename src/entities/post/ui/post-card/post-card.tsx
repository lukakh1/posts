"use client";
import { Post } from "@/shared/types";
import CardUi from "./card-ui";
import { Heart, MoreSVG } from "./svgs";
import { Dots } from "./dots";
import { useLikeStore } from "@/shared/providers";
import Link from "next/link";

export default function PostCard({
  post,
  showRead = true,
}: {
  post: Post;
  showRead?: boolean;
}) {
  const isCurrentlyLiked = useLikeStore((state) =>
    state.liked.includes(post.id)
  );
  const likePost = useLikeStore((state) => state.likePost);
  const unlikePost = useLikeStore((state) => state.unlikePost);

  const handleLikeClick = () => {
    if (isCurrentlyLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  return (
    <CardUi>
      <div className="relative z-10">
        <h2 className="mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-2xl font-bold leading-tight text-transparent transition-all duration-300 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-blue-200">
          {post.title}
        </h2>

        <p className="text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
          {post.body}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleLikeClick}
            className={`cursor-pointer group/like relative overflow-hidden rounded-full bg-gradient-to-r p-3 transition-all duration-300 hover:scale-110 hover:from-red-500/20 hover:to-pink-500/20 active:scale-95 ${
              isCurrentlyLiked
                ? "from-red-500 to-pink-500"
                : "from-slate-800 to-slate-500"
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-0 blur transition-opacity duration-300 group-hover/like:opacity-30"></div>

            <Heart isLiked={isCurrentlyLiked} />

            <div className="absolute inset-0 rounded-full bg-red-500/30 scale-0 transition-transform duration-200 group-active/like:scale-150"></div>
          </button>

          {showRead && (
            <div className="flex items-center space-x-4">
              <Dots />

              <Link
                href={`/posts/${post.id}`}
                className="flex items-center space-x-1 text-xs text-gray-500 transition-colors duration-300 group-hover:text-purple-300"
              >
                <span>Read more</span>
                <MoreSVG />
              </Link>
            </div>
          )}
        </div>
      </div>
    </CardUi>
  );
}
