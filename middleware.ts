import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic guard for the admin app: no session cookie → straight to login.
// The pages themselves re-verify the session server-side (this is just fast UX).
export function middleware(req: NextRequest) {
  const cookie = getSessionCookie(req);
  if (!cookie) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
