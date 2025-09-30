import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Ensure a UUID cookie is always set to enable experimentation
export const GB_UUID_COOKIE = "gb-user-id";

export async function middleware(request: NextRequest) {
  // Generate a UUID if it doesn't exist yet
  let uuid = request.cookies.get(GB_UUID_COOKIE)?.value;
  let needsUpdate = false;
  if (!uuid) {
    uuid = crypto.randomUUID();
    needsUpdate = true;

    // Set the cookie on the current request
    request.cookies.set(GB_UUID_COOKIE, uuid);
  }

  // Forward the request to the server
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // Add the newly created UUID to the response headers to persist in the browser
  if (needsUpdate) {
    response.cookies.set(GB_UUID_COOKIE, uuid);
  }

  return response;
}

// Run for all pages that need experiments
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|studio).*)"],
};
