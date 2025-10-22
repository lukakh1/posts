import { getPosts } from "@/app/entities/api/posts";
import {
  gb,
  initializeGrowthBook,
} from "@/app/shared/services/growthbook.service";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export type HomeFlags = {
  postDisplay: boolean;
  postCardType: number;
};

export async function readHomeFlags(): Promise<HomeFlags> {
  // Initialize GrowthBook before reading flags
  await initializeGrowthBook();

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
