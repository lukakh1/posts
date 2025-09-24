export function MoreSVG() {
  return (
    <svg
      className="h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export function Heart({ isLiked = false }: { isLiked: boolean }) {
  return (
    <svg
      className="relative z-10 h-5 w-5 transform text-gray-400 transition-all duration-300 group-hover/like:text-red-400 group-hover/like:scale-110 group-active/like:text-red-500"
      fill={isLiked ? "black" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        className="transition-all duration-300 group-hover/like:fill-red-400/30 group-active/like:fill-red-500/50"
      />
    </svg>
  );
}
