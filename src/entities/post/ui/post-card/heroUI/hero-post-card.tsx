import { LikeButton } from "@/features";
import { Link } from "@/features/i18n";
import { Post } from "@/shared/types";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import { MoreSVG } from "../svgs";

export default function HeroPostCard({ post }: { post: Post }) {
  return (
    <div data-testid="post-item">
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
          <Link
            href={`/posts/${post.id}`}
            className="flex items-center space-x-1 text-xs text-gray-500 transition-colors duration-300 hover:text-purple-300"
          >
            <span>Read more</span>
            <MoreSVG />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
