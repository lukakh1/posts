import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z
      .string()
      .url({ message: "API_URL must be a valid URL" })
      .default("http://localhost:3001"),
    NEXT_PUBLIC_MIXPANEL_TOKEN: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_MIXPANEL_TOKEN is required" })
      .default("test-mixpanel-token"),
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url({ message: "NEXT_PUBLIC_SUPABASE_URL must be a valid URL" })
      .default("https://test-project.supabase.co"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SUPABASE_ANON_KEY is required" })
      .default("test-supabase-anon-key"),
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z
      .string()
      .url({ message: "NEXT_PUBLIC_GROWTHBOOK_API_HOST must be a valid URL" })
      .default("https://cdn.growthbook.io"),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY is required" })
      .default("test-growthbook-client-key"),
    NEXT_PUBLIC_SENTRY_DSN: z
      .string()
      .url({ message: "NEXT_PUBLIC_SENTRY_DSN must be a valid URL" })
      .default("https://test@sentry.io/test"),
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: z
      .string()
      .min(1, { message: "NEXT_PUBLIC_SENTRY_ENVIRONMENT is required" })
      .default("test"),
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
