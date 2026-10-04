import { NextRequest, NextResponse } from "next/server";

/**
 * Cheap edge-level gate: just checks whether an Auth.js session cookie is
 * present at all, before the page even renders. The real checks (session
 * actually valid, account approved, role allowed) happen server-side in each
 * protected layout via `auth()` - that needs Prisma, which can't run on the
 * Edge runtime this proxy executes in, so it's deliberately kept dumb.
 */
const SESSION_COOKIE_NAMES = ["authjs.session-token", "__Secure-authjs.session-token"];

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/classes",
  "/announcements",
  "/report",
  "/coaching-clinic",
  "/curriculum",
  "/facilities",
  "/rules",
  "/school-information",
  "/onboarding",
  "/pending-approval",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const hasSession = SESSION_COOKIE_NAMES.some((name) => request.cookies.has(name));
  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/classes/:path*",
    "/announcements/:path*",
    "/report/:path*",
    "/coaching-clinic/:path*",
    "/curriculum/:path*",
    "/facilities/:path*",
    "/rules/:path*",
    "/school-information/:path*",
    "/onboarding",
    "/pending-approval",
  ],
};
