import { getGB } from "@/pkg/libraries/growthbook/growthbook";

// Centralized GrowthBook service
// Attributes are defined here to avoid passing them from every page.
export const attributes: { [key: string]: string } = {
  id: "7",
};

export const gb = getGB({ attributes });
await gb.init();
