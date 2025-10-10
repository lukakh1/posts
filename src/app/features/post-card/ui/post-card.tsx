"use client";
import { Post } from "@/app/entities/models";
import { LikeButton } from "@/app/features";
import { CardUi } from "@/app/shared/ui";
import { Link } from "@/pkg/libraries/locale";
import { useTranslations } from "next-intl";

export default function PostCard({
  post,
  showRead = true,
}: {
  post: Post;
  showRead?: boolean;
}) {
  const t = useTranslations("PostCard");
  return (
    <CardUi>
      <div data-testid="post-item" className="relative z-10">
        <h2 className="mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-2xl font-bold leading-tight text-transparent transition-all duration-300 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-blue-200 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200 line-clamp-5">
          {post.body}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <LikeButton id={post.id} type={0} />

          {showRead && (
            <div className="flex items-center space-x-4">
              <Link
                href={`/posts/${post.id}`}
                className="flex items-center space-x-1 text-xs text-gray-500 transition-colors duration-300 group-hover:text-purple-300"
              >
                <span>{t("read-more")}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </CardUi>
  );
}
