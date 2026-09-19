import "server-only";
import { createHash } from "crypto";

/**
 * Access code gate for /admin. Server-only — the code and the derived
 * session token never reach the client bundle (unlike a client-side JS
 * check, which anyone can read out of dev tools).
 *
 * Override via environment variables in production:
 *   ADMIN_ACCESS_CODE=your-code
 *   ADMIN_SESSION_SECRET=some-random-string
 */
const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || "kishin-admin-2026";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "kishin-static-site-secret";

export const ADMIN_SESSION_COOKIE = "kishin_admin_session";

export function isValidAdminCode(code: string): boolean {
  return typeof code === "string" && code.trim().length > 0 && code.trim() === ADMIN_ACCESS_CODE;
}

/** The cookie value a valid login sets, and what a request is checked against. */
export function getAdminSessionToken(): string {
  return createHash("sha256").update(`${ADMIN_ACCESS_CODE}:${SESSION_SECRET}`).digest("hex");
}
