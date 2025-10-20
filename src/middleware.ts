import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

import { routing } from "@/pkg/libraries/locale/routing";
import { updateSession } from "@/pkg/libraries/supabase";

export async function middleware(req: NextRequest) {
  const i18nRes = createMiddleware(routing)(req);

  const i18nRedirectLocation = i18nRes.headers.get("location");
  if (i18nRedirectLocation) {
    const country =
      req.headers.get("cf-ipcountry") ||
      req.headers.get("cloudfront-viewer-country") ||
      req.headers.get("X-Country") ||
      req.cookies.get("country")?.value ||
      "US";
    i18nRes.headers.set("x-country", country);
    i18nRes.cookies.set("x-country", country);
    return i18nRes;
  }

  const sessionRes = await updateSession(req);

  const country =
    req.headers.get("cf-ipcountry") ||
    req.headers.get("cloudfront-viewer-country") ||
    req.headers.get("X-Country") ||
    req.cookies.get("country")?.value ||
    "US";

  sessionRes.headers.set("x-country", country);
  sessionRes.cookies.set("x-country", country);

  const forwardedHeaders = [
    "x-middleware-rewrite",
    "x-middleware-override-headers",
    "x-middleware-request-x-url",
    "x-middleware-request-x-host",
    "x-middleware-request-x-forwarded-host",
    "x-middleware-request-x-forwarded-port",
    "x-middleware-request-x-forwarded-proto",
    "x-middleware-request-x-locale",
  ];
  for (const headerName of forwardedHeaders) {
    const value = i18nRes.headers.get(headerName);
    if (value != null) sessionRes.headers.set(headerName, value);
  }

  return sessionRes;
}

// config
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_next/static|_next/image|_vercel|static|.well-known|admin|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)",
  ],
};
