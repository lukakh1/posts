import { Post } from "@/app/entities/models";
import { PostContent } from "@/app/features";

export default function PostsModule({ post }: { post: Post }) {
  return (
    <div className="w-full">
      <PostContent post={post} />
    </div>
  );
}
