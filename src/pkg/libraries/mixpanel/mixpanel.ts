import { envClient } from "@/config/env";
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = envClient.NEXT_PUBLIC_MIXPANEL_TOKEN!;

mixpanel.init(MIXPANEL_TOKEN, {
  debug: true,
  track_pageview: true,
  api_host: "https://api-eu.mixpanel.com",
});

export default mixpanel;
