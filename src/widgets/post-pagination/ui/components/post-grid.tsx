import { PostCard } from "@/entities/post/ui";
import { Post } from "@/shared/types";
import { EmptyState } from "./empty-state";

interface PostsGridProps {
  posts: Post[];
  isPlaceholderData?: boolean;
}

export const PostsGrid = ({
  posts,
  isPlaceholderData = false,
}: PostsGridProps) => {
  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={`transition-all duration-300 ${
        isPlaceholderData ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <ul className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};
