import "server-only";
import { fetchSheetRows, mergeWithFallback, combineSources, splitClassTabRows, SheetResult } from "@/lib/sheets";
import {
  CLASS_TAB_ORDER,
  fallbackClasses,
  fallbackSpecialClassrooms,
  mapClassRow,
  mapSpecialClassroomRow,
  SchoolClass,
  SpecialClassroom,
} from "./classes";

export interface ClassesResult extends SheetResult<SchoolClass> {
  /** Per-class source, same order as `data` - lets the admin panel show which
   *  specific class tab (A/B/C/D/E/International) is live vs still fallback. */
  perClassSource: SheetResult<SchoolClass>["source"][];
}

export async function getClasses(): Promise<ClassesResult> {
  const perClass = await Promise.all(
    CLASS_TAB_ORDER.map(async ({ tab, className }, i) => {
      const rows = await fetchSheetRows(tab);
      const { infoRow } = splitClassTabRows(rows);
      return infoRow
        ? { data: mapClassRow(infoRow, className), source: "sheet" as const }
        : { data: fallbackClasses[i], source: "fallback" as const };
    })
  );

  return {
    data: perClass.map((r) => r.data),
    source: combineSources(perClass.map((r) => r.source)),
    perClassSource: perClass.map((r) => r.source),
  };
}

export async function getSpecialClassrooms(): Promise<SheetResult<SpecialClassroom>> {
  const rows = await fetchSheetRows("specialClassrooms");
  const mapped = rows.map(mapSpecialClassroomRow).filter((c): c is SpecialClassroom => c !== null);
  return mergeWithFallback(mapped, fallbackSpecialClassrooms);
}
