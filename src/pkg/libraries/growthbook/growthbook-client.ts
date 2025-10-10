import { envClient } from "@/config/env";
import { Context, GrowthBook } from "@growthbook/growthbook-react";

export const getGBClient = (context?: Context) => {
  return new GrowthBook({
    ...context,
    apiHost: envClient.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: envClient.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
  });
};
