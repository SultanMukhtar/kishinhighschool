import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import { Extracurricular, fallbackExtracurriculars, mapExtracurricularRow } from "./extracurriculars";

export async function getExtracurriculars(): Promise<SheetResult<Extracurricular>> {
  const rows = await fetchSheetRows("extracurriculars");
  const mapped = rows.map(mapExtracurricularRow).filter((e): e is Extracurricular => e !== null);
  return mergeWithFallback(mapped, fallbackExtracurriculars);
}
