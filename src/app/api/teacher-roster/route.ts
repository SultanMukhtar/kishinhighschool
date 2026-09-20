import { NextResponse } from "next/server";
import { getTeachers } from "@/data/teachers.server";

/** Full staff list - used by the login form to verify teacher/coach identity. */
export async function GET() {
  const result = await getTeachers();
  return NextResponse.json({ teachers: result.data, source: result.source });
}
