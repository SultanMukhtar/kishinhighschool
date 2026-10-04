import { redirect } from "next/navigation";
import { auth } from "@/auth";
import PendingApprovalScreen from "@/components/onboarding/PendingApprovalScreen";

export default async function PendingApprovalPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (!session.user.icName) redirect("/onboarding");
  if (session.user.accountStatus === "APPROVED") redirect("/dashboard");

  return (
    <PendingApprovalScreen
      icName={session.user.icName}
      rejected={session.user.accountStatus === "REJECTED"}
    />
  );
}
