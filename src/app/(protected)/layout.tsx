import { ReactNode } from "react";
import { requireApprovedUser } from "@/lib/session";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  await requireApprovedUser();
  return <>{children}</>;
}
