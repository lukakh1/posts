import { getGB } from "@/pkg/libraries/growthbook/growthbook";

export const attributes: { [key: string]: string } = {
  id: "7",
};

export const gb = getGB({ attributes });

export const initializeGrowthBook = async () => {
  await gb.init();
  return gb;
};

export type HomeFlags = {
  postDisplay: boolean;
  postCardType: number;
};

export async function readHomeFlags(): Promise<HomeFlags> {
  await initializeGrowthBook();

  return {
    postDisplay: gb.getFeatureValue("post-display", true),
    postCardType: gb.getFeatureValue("post-card-style", 0),
  } as HomeFlags;
}
