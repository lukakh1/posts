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
    command: process.env.CI ? "npm run dev" : "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: "pipe",
    stderr: "pipe",
    env: {
      CI: process.env.CI!,
      NODE_ENV: process.env.NODE_ENV!,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
      NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      NEXT_PUBLIC_GROWTHBOOK_API_HOST:
        process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST!,
      NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
        process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY!,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN!,
      NEXT_PUBLIC_SENTRY_ENVIRONMENT:
        process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT!,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN!,
      SENTRY_ORG: process.env.SENTRY_ORG!,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT!,
    },
  },
});
