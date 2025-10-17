import { envServer } from "@/config/env";
import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",

  poweredByHeader: false,
  cacheMaxMemorySize: 100 * 1024 * 1024,

  logging: {
    fetches: {
      fullUrl: envServer.NODE_ENV !== "production",
    },
  },

  serverExternalPackages: ["pino", "pino-pretty", "postgres"],

  experimental: {
    reactCompiler: true,
    optimizeServerReact: true,
    optimizePackageImports: [
      "zod",
      "react-hook-form",
      "usehooks-ts",
      "@heroui/react",
      "@heroui/accordion",
      "@heroui/autocomplete",
      "@heroui/avatar",
      "@heroui/badge",
      "@heroui/button",
      "@heroui/card",
      "@heroui/chip",
      "@heroui/divider",
      "@heroui/dropdown",
      "@heroui/input",
      "@heroui/link",
      "@heroui/modal",
      "@heroui/navbar",
      "@heroui/radio",
      "@heroui/scroll-shadow",
      "@heroui/select",
      "@heroui/skeleton",
      "@heroui/spinner",
      "@heroui/system",
      "@heroui/table",
      "@heroui/tabs",
      "@heroui/theme",
      "@heroui/tooltip",
      "zustand",
      "framer-motion",
    ],
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  redirects: async () => {
    return [
      {
        source: `/:locale/admin/:path*`,
        destination: "/admin/:path*",
        permanent: true,
      },
    ];
  },
};

// First apply next-intl plugin
const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/pkg/libraries/locale/request.ts",
  experimental: {
    createMessagesDeclaration: "./translations/en.json",
  },
});
const configWithIntl = withNextIntl(nextConfig);

// Then apply Sentry plugin
export default withSentryConfig(configWithIntl, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "rubylabs-95",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  sourcemaps: { disable: true },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
