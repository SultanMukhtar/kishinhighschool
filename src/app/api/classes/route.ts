import { NextResponse } from "next/server";
import { getClasses } from "@/data/classes.server";

export async function GET() {
  const result = await getClasses();
  return NextResponse.json(result);
}
