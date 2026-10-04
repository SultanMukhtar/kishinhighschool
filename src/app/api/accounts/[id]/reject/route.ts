import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;

  const target = await prisma.user.update({
    where: { id },
    data: {
      status: "REJECTED",
      approvedById: session.user.id,
      approvedAt: new Date(),
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: "REJECT_SIGNUP",
      targetType: "User",
      targetId: target.id,
    },
  });

  return NextResponse.json({ success: true });
}
