import { NextResponse } from "next/server";
import { fetchSheetRows } from "@/lib/sheets";
import { SheetTab, SHEET_CSV_URLS } from "@/lib/sheetsConfig";

const VALID_TABS = Object.keys(SHEET_CSV_URLS) as SheetTab[];

export async function GET(_request: Request, { params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;

  if (!VALID_TABS.includes(tab as SheetTab)) {
    return NextResponse.json({ rows: [] }, { status: 400 });
  }

  const rows = await fetchSheetRows(tab as SheetTab);
  return NextResponse.json({ rows });
}
