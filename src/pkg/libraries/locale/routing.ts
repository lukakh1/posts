import { defineRouting } from "next-intl/routing";

// routing
export const routing = defineRouting({
  locales: ["en", "ru"],
  localePrefix: "as-needed",
  localeDetection: false,
  defaultLocale: "en",
});
