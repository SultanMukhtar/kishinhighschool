import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) {
    return NextResponse.json({ error: "Profil sudah pernah dibuat." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const icName = typeof body?.icName === "string" ? body.icName.trim() : "";
  const classId = typeof body?.classId === "string" ? body.classId.trim() : "";
  const age = Number(body?.age);

  if (!icName || !classId || !Number.isFinite(age) || age <= 0) {
    return NextResponse.json(
      { error: "Nama IC, Class, dan Umur wajib diisi dengan benar." },
      { status: 400 }
    );
  }

  const targetClass = await prisma.class.findUnique({ where: { id: classId } });
  if (!targetClass) {
    return NextResponse.json({ error: "Class tidak valid." }, { status: 400 });
  }

  await prisma.studentProfile.create({
    data: { userId: session.user.id, icName, classId, age },
  });

  return NextResponse.json({ success: true });
}
