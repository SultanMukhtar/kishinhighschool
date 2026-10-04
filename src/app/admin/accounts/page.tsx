import { requireSuperadmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AccountsQueueClient from "@/components/admin/AccountsQueueClient";

export default async function AdminAccountsPage() {
  await requireSuperadmin();

  const pending = await prisma.user.findMany({
    where: { status: "PENDING" },
    include: { studentProfile: { include: { class: true } } },
    orderBy: { createdAt: "asc" },
  });

  return <AccountsQueueClient pending={pending} />;
}
