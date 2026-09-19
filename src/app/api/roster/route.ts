import { NextResponse } from "next/server";
import { getStudents } from "@/data/students.server";

/**
 * Combined student roster across every class tab - used by the login form.
 * Kept as its own endpoint (rather than exposing each class tab's raw rows)
 * since the roster needs server-side mapping + per-class fallback anyway.
 */
export async function GET() {
  const result = await getStudents();
  return NextResponse.json({ students: result.data, source: result.source });
}
