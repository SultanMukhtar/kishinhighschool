import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import { fallbackFacilities, mapFacilityRow, Facility } from "./facilities";

export async function getFacilities(): Promise<SheetResult<Facility>> {
  const rows = await fetchSheetRows("facilities");
  const mapped = rows.map(mapFacilityRow).filter((f): f is Facility => f !== null);
  return mergeWithFallback(mapped, fallbackFacilities);
}
