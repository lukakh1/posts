import { LikeButton } from "@/features";
import { Post } from "@/shared/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@heroui/react";

export default function HeroPostCard({ post }: { post: Post }) {
  return (
    <Card className="max-w-[400px] bg-slate-800">
      <CardHeader className="flex gap-3">
        <LikeButton id={post.id} type={1} />
        <div className="w-2/3">
          <p className="text-md line-clamp-1">{post.title}</p>
          <p className="text-small text-default-500">{post.id}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="line-clamp-2">{post.body}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={`/posts/${post.id}`}>
          read more
        </Link>
      </CardFooter>
    </Card>
  );
}
