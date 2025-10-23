import { getGB } from "@/pkg/libraries/growthbook/growthbook";

// Centralized GrowthBook service
// Attributes are defined here to avoid passing them from every page.
export const attributes: { [key: string]: string } = {
  id: "7",
};

export const gb = getGB({ attributes });

// Initialize GrowthBook instance
export const initializeGrowthBook = async () => {
  await gb.init();
  return gb;
};

// Home flags and prefetching
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
