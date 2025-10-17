import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production"])
      .optional()
      .default("development"),
    DATABASE_URL: z.string().min(1, { message: "DATABASE_URL is required" }),
    SENTRY_AUTH_TOKEN: z
      .string()
      .min(1, { message: "SENTRY_AUTH_TOKEN is required" }),
    SENTRY_ORG: z.string().min(1, { message: "SENTRY_ORG is required" }),
    SENTRY_PROJECT: z
      .string()
      .min(1, { message: "SENTRY_PROJECT is required" }),
    CI: z
      .string()
      .transform((val) => val === "true")
      .default(false),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    CI: process.env.CI,
  },
});
