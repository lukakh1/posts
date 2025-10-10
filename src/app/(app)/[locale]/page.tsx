import {
  HomeModule,
  initHomeGrowthbook,
  prefetchHomeQueries,
} from "@/app/modules";
import GBProvider from "@/pkg/libraries/growthbook/growthbook.provider";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";

export const revalidate = 30;

export default async function Home() {
  const attributes = {
    id: "6",
  };

  const t = await getTranslations("HomePage");

  const gb = await initHomeGrowthbook(attributes);
  const queryClient = await prefetchHomeQueries();
  const postDisplay = gb.getFeatureValue("post-display", true);
  const postCardType = gb.getFeatureValue("post-card-style", 0);

  return (
    <GBProvider payload={gb.getDecryptedPayload()} attributes={attributes}>
      <h1 className="text-4xl font-bold text-center mt-8 text-slate-100">
        {t("welcome-message")}
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
        {t("description")}
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeModule postDisplay={postDisplay} postCardType={postCardType} />
      </HydrationBoundary>
    </GBProvider>
  );
}
