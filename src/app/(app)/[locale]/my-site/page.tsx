import { prefetchPosts } from "@/app/entities/api/posts";
import { PostsWidget } from "@/app/widgets";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;
export const dynamic = "force-static";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const queryClient = await prefetchPosts();

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8 text-slate-100">
        {t("welcome-message")}
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        {t("description")}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsWidget
          displayType="simple"
          className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          testId="post-data"
        />
      </HydrationBoundary>
    </>
  );
}
