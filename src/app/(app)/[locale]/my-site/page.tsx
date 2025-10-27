import { prefetchAllPosts } from "@/app/entities/api/posts";
import { SimplePostsWidget } from "@/app/widgets";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;
export const dynamic = "force-static";

export default async function Home() {
  const t = await getTranslations("HomePage");
  const queryClient = await getQueryClient();
  await prefetchAllPosts(queryClient);

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8 text-slate-100">
        {t("welcome-message")}
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        {t("description")}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SimplePostsWidget
          className="mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          testId="post-data"
        />
      </HydrationBoundary>
    </>
  );
}
