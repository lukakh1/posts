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
