import { getPrefetchedBlogs, prefetchBlogs } from "@/app/entities/api/blogs";
import { BlogCard } from "@/app/features";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 30;
export const dynamic = "force-static";

export default async function BlogsPage() {
  const queryClient = await prefetchBlogs();
  const blogs = await getPrefetchedBlogs(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        data-testid="blog-data"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </HydrationBoundary>
  );
}
