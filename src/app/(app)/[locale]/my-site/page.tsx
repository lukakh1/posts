import { HomeModule, prefetchHomeQueries, readHomeFlags } from "@/app/modules";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export default async function Home() {
  const t = await getTranslations("HomePage");
  const queryClient = await prefetchHomeQueries();
  const { postDisplay, postCardType } = readHomeFlags();

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-8 text-slate-100">
        {t("welcome-message")}
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        {t("description")}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeModule postDisplay={postDisplay} postCardType={postCardType} />
      </HydrationBoundary>
    </>
  );
}
