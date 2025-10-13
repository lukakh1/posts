import { Blog } from "@/app/entities";
import { CardUi } from "@/app/shared/ui";

export default function BlogCard({ blog }: { blog: Blog }) {
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <CardUi>
      <div
        data-testid="blog-item"
        className="relative z-10 flex flex-col h-full"
      >
        <h2 className="mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-2xl font-bold leading-tight text-transparent transition-all duration-300 group-hover:from-purple-200 group-hover:via-pink-200 group-hover:to-blue-200 line-clamp-2">
          {blog.title}
        </h2>

        {blog.sub_title && (
          <p className="mb-3 text-gray-400 text-sm font-medium transition-colors duration-300 group-hover:text-gray-300 line-clamp-1">
            {blog.sub_title}
          </p>
        )}

        <p className="mb-4 text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-200 line-clamp-4 flex-grow">
          {blog.body}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 transition-colors duration-300 group-hover:bg-purple-500/30 group-hover:border-purple-400/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
            {formattedDate}
          </p>
        </div>
      </div>
    </CardUi>
  );
}
