import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Disable Session Replay - this is what causes hydration errors
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Adjust this value in production
  tracesSampleRate: 1.0,

  // Set to false in production
  debug: false,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  environment: process.env.NODE_ENV,
});
