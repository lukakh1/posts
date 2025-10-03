import createMiddleware from "next-intl/middleware";
import { routing } from "./features/i18n";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … sentry routes
  matcher:
    "/((?!api|trpc|_next|_vercel|monitoring|sentry-example-page|.*\\..*).*)",
};
