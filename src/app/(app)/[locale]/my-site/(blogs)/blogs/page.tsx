import { BlogsModule, getPrefetchedBlogs, prefetchBlogs } from "@/app/modules";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const revalidate = 30;

export default async function BlogsPage() {
  const queryClient = await prefetchBlogs();
  const blogs = getPrefetchedBlogs(queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogsModule blogs={blogs} />
    </HydrationBoundary>
  );
}
