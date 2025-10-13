import { Post } from "@/app/entities";
import { PostContent } from "@/app/widgets/post-content";

export default function PostsModule({ post }: { post: Post }) {
  return (
    <div className="w-full">
      <PostContent post={post} />
    </div>
  );
}
