import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z
      .string()
      .url({ message: "API_URL must be a valid URL" }),
    NEXT_PUBLIC_MIXPANEL_TOKEN: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_MIXPANEL_TOKEN is required" }),
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url({ message: "NEXT_PUBLIC_SUPABASE_URL must be a valid URL" }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_ANON_KEY is required" }),
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z
      .string()
      .url({ message: "NEXT_PUBLIC_GROWTHBOOK_API_HOST must be a valid URL" }),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY is required" }),
    NEXT_PUBLIC_SENTRY_DSN: z
      .string()
      .url({ message: "NEXT_PUBLIC_SENTRY_DSN must be a valid URL" }),
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SENTRY_ENVIRONMENT is required" }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GROWTHBOOK_API_HOST:
      process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
      process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  },
});
