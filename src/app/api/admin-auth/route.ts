import { NextRequest, NextResponse } from "next/server";
import { isValidAdminCode, getAdminSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  let code = "";
  try {
    const body = await request.json();
    code = body?.code ?? "";
  } catch {
    return NextResponse.json({ success: false, message: "Request tidak valid." }, { status: 400 });
  }

  if (!isValidAdminCode(code)) {
    return NextResponse.json(
      { success: false, message: "Kode akses salah." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, getAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
