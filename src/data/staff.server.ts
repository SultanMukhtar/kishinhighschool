import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import { fallbackStaff, mapStaffRow, StaffMember } from "./staff";

export async function getStaff(): Promise<SheetResult<StaffMember>> {
  const rows = await fetchSheetRows("staff");
  const mapped = rows.map(mapStaffRow).filter((s): s is StaffMember => s !== null);
  return mergeWithFallback(mapped, fallbackStaff);
}
