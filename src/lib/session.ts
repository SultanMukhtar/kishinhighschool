import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { AuthUser } from "@/lib/auth";

/**
 * Server-side gate for every protected page - this is the real check (role,
 * approval status, profile completeness). The Edge `middleware.ts` only does
 * a cheap cookie-presence check before this ever runs.
 */
export async function requireApprovedUser(): Promise<AuthUser> {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  // Only students self-onboard. Staff/superadmin profiles are set up manually
  // (see prisma/seed.ts) until Phase 2+ adds a real promotion UI - they
  // shouldn't get stuck in the student onboarding form just for lacking one.
  if (session.user.role === "USER" && !session.user.icName) {
    redirect("/onboarding");
  }
  if (session.user.accountStatus !== "APPROVED") {
    redirect("/pending-approval");
  }
  return session.user;
}

export async function requireSuperadmin(): Promise<AuthUser> {
  const user = await requireApprovedUser();
  if (user.role !== "SUPERADMIN") {
    redirect("/dashboard");
  }
  return user;
}
