import { Blog } from "@/app/entities/models";
import { BlogCard } from "@/app/widgets";

export default function BlogsModule({ blogs }: { blogs: Blog[] }) {
  return (
    <div
      data-testid="blog-data"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
