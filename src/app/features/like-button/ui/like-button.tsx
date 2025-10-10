"use client";
import { useLikeStore } from "@/app/shared/providers";
import { Heart } from "./heart-svg";

export default function LikeButton({ id, type }: { id: number; type: number }) {
  const isCurrentlyLiked = useLikeStore((state) => state.liked.includes(id));
  const likePost = useLikeStore((state) => state.likePost);
  const unlikePost = useLikeStore((state) => state.unlikePost);
  const handleLikeClick = () => {
    if (isCurrentlyLiked) {
      unlikePost(id, type);
    } else {
      likePost(id, type);
    }
  };
  return (
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
  );
}
