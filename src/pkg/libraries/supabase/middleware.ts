import { NextResponse, type NextRequest } from "next/server";

export const createClient = (request: NextRequest) => {
  const supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return supabaseResponse;
};
