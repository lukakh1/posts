"use client";
import { Post } from "@/app/entities";
import { LikeButton } from "@/app/features";
import { useLikeStore } from "@/app/shared/providers";
import { mixpanel } from "@/pkg/libraries/mixpanel";
import { useEffect } from "react";

export default function PostContent({ post }: { post: Post }) {
  useEffect(() => {
    mixpanel.track("Page Viewed", {
      page: "single post page",
    });
  }, []);
  const isCurrentlyLiked = useLikeStore((state) =>
    state.liked.includes(post.id)
  );

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
              <LikeButton id={post.id} type={0} />

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
