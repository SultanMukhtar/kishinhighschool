import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import { fallbackTeachers, mapTeacherRow, Teacher } from "./teachers";

export async function getTeachers(): Promise<SheetResult<Teacher>> {
  const rows = await fetchSheetRows("teachers");
  const mapped = rows.map(mapTeacherRow).filter((t): t is Teacher => t !== null);
  return mergeWithFallback(mapped, fallbackTeachers);
}
