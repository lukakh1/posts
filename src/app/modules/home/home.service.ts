import { getPosts } from "@/app/entities";
import { getGB } from "@/pkg/libraries/growthbook/growthbook";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export type HomeFlags = {
  postDisplay: boolean;
  postCardType: number;
};

export async function initHomeGrowthbook(attributes: {
  [key: string]: string;
}) {
  const gb = getGB({ attributes });
  await gb.init();
  return gb;
}

export function readHomeFlags(gb: ReturnType<typeof getGB>): HomeFlags {
  // gb here is a GrowthBook instance; callers must pass the initialized instance
  return {
    postDisplay: gb.getFeatureValue("post-display", true),
    postCardType: gb.getFeatureValue("post-card-style", 0),
  } as HomeFlags;
}

export async function prefetchHomeQueries() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
    staleTime: 30 * 1000,
  });
  return queryClient;
}
