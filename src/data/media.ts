import type { SheetRow } from "@/lib/sheets";

export interface SiteMedia {
  logoUrl: string;
  /** Login page background slideshow images, in order. May be shorter than 6 -
   *  any missing slot just falls back to a themed gradient in the UI. */
  loginBackgrounds: string[];
}

export const fallbackMedia: SiteMedia = {
  logoUrl: "",
  loginBackgrounds: [],
};

const BACKGROUND_COLUMNS = ["loginBg1", "loginBg2", "loginBg3", "loginBg4", "loginBg5", "loginBg6"];

/** Pure row -> SiteMedia mapper. Client-safe (no sheet-fetching code pulled in). */
export function mapMediaRow(row: SheetRow): SiteMedia {
  return {
    logoUrl: row.logo?.trim() || "",
    loginBackgrounds: BACKGROUND_COLUMNS.map((col) => row[col]?.trim() || "").filter(
      (url) => url.length > 0
    ),
  };
}
