import { Post } from "@/app/entities/models";
import { PostContent } from "@/app/widgets";

export default function PostsModule({ post }: { post: Post }) {
  return (
    <div className="w-full">
      <PostContent post={post} />
    </div>
  );
}
