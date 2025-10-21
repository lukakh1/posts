import { envServer } from "@/config/env";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: process.env.CI ? "retain-on-failure" : "off",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      // Server environment variables (from env.server.ts)
      CI: envServer.CI.toString(),
      NODE_ENV: envServer.NODE_ENV,
      DATABASE_URL: envServer.DATABASE_URL,
      SENTRY_AUTH_TOKEN: envServer.SENTRY_AUTH_TOKEN,
      SENTRY_ORG: envServer.SENTRY_ORG,
      SENTRY_PROJECT: envServer.SENTRY_PROJECT,

      // Client environment variables (already set above)
      NEXT_PUBLIC_API_URL:
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      NEXT_PUBLIC_MIXPANEL_TOKEN:
        process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ||
        "cpm8AJVSnZdC1LethyvlAx0EocHSDLSx",
      NEXT_PUBLIC_SUPABASE_URL:
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "https://llmbqcahedfqvdycegkw.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbWJxY2FoZWRmcXZkeWNlZ2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzOTIxNjYsImV4cCI6MjA3NDk2ODE2Nn0.I6kwnuQsGRwLUxu3ZKzC2P3bn_kIuy-C1WuEh4TQXV0",
      NEXT_PUBLIC_GROWTHBOOK_API_HOST:
        process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST ||
        "https://cdn.growthbook.io",
      NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
        process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || "sdk-kBHXy0mfynQb5rF6",
      NEXT_PUBLIC_SENTRY_DSN:
        process.env.NEXT_PUBLIC_SENTRY_DSN || "https://test@sentry.io/test",
      NEXT_PUBLIC_SENTRY_ENVIRONMENT:
        process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "test",
    },
  },
});
