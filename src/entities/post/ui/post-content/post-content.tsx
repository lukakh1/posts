"use client";
import { Post } from "@/shared/types";
import { Heart } from "../post-card/svgs";
import { useLikeStore } from "@/shared/providers";

export default function PostContent({ post }: { post: Post }) {
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
    <div className="w-full max-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl w-full h-full flex flex-col justify-center bg-slate-800 rounded-3xl">
        <article className="relative z-10 bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700/50 shadow-2xl">
          <header className="mb-8">
            <h1 className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-lg md:text-xl lg:text-2xl font-bold leading-tight text-transparent transition-all duration-500 hover:from-purple-200 hover:via-pink-200 hover:to-blue-200">
              {post.title}
            </h1>
          </header>

          <main className="mb-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed transition-colors duration-300 hover:text-gray-200">
                {post.body}
              </p>
            </div>
          </main>

          <footer className="flex items-center justify-between border-t border-gray-700/30 pt-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLikeClick}
                className={`cursor-pointer group/like relative overflow-hidden rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 transform ${
                  isCurrentlyLiked
                    ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
                    : "bg-gradient-to-r from-slate-800 to-slate-600 hover:from-red-500/20 hover:to-pink-500/20"
                }`}
                aria-label={isCurrentlyLiked ? "Unlike post" : "Like post"}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-0 blur-md transition-opacity duration-300 group-hover/like:opacity-40"></div>

                <div className="relative z-10">
                  <Heart isLiked={isCurrentlyLiked} />
                </div>

                <div className="absolute inset-0 rounded-full bg-red-500/30 scale-0 transition-transform duration-200 group-active/like:scale-150"></div>
              </button>

              <span className="text-gray-400 text-sm font-medium">
                {isCurrentlyLiked ? "Liked" : "Like this post"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                Post ID: {post.id}
              </span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
