import { NextResponse } from "next/server";
import { getMedia } from "@/data/media.server";

export async function GET() {
  const result = await getMedia();
  return NextResponse.json(result);
}
