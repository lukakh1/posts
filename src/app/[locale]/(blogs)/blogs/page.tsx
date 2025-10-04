import { getBlogs } from "@/entities/blogs/api";
import { BlogCard } from "@/entities/blogs/ui";

export const revalidate = 30;

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.data?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
