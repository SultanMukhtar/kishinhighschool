import "server-only";
import { fetchSheetRows, SheetSource } from "@/lib/sheets";
import { fallbackMedia, mapMediaRow, SiteMedia } from "./media";

export interface MediaResult {
  data: SiteMedia;
  source: SheetSource;
}

/** The `media` tab holds exactly one data row (logo + login background links). */
export async function getMedia(): Promise<MediaResult> {
  const rows = await fetchSheetRows("media");
  if (rows.length === 0) {
    return { data: fallbackMedia, source: "fallback" };
  }
  return { data: mapMediaRow(rows[0]), source: "sheet" };
}
