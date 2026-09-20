import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import { fallbackWhitelistJobs, mapWhitelistJobRow, WhitelistJob } from "./whitelistJobs";

export async function getWhitelistJobs(): Promise<SheetResult<WhitelistJob>> {
  const rows = await fetchSheetRows("whitelistJobs");
  const mapped = rows.map(mapWhitelistJobRow).filter((j): j is WhitelistJob => j !== null);
  return mergeWithFallback(mapped, fallbackWhitelistJobs);
}
