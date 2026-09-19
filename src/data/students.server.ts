import "server-only";
import { fetchSheetRows, combineSources, splitClassTabRows, SheetResult } from "@/lib/sheets";
import { CLASS_TAB_ORDER } from "./classes";
import { fallbackStudents, mapStudentRow, Student } from "./students";

/**
 * Students no longer live in a dedicated "Students" tab - each class tab
 * carries its own roster (rowType=STUDENT rows), so a wali kelas only ever
 * needs to open their own class's tab. This combines all of them for login.
 */
export async function getStudents(): Promise<SheetResult<Student>> {
  const perClass = await Promise.all(
    CLASS_TAB_ORDER.map(async ({ tab, className }) => {
      const rows = await fetchSheetRows(tab);
      const { studentRows } = splitClassTabRows(rows);
      const mapped = studentRows
        .map((r) => mapStudentRow(r, className))
        .filter((s): s is Student => s !== null);

      if (mapped.length > 0) {
        return { data: mapped, source: "sheet" as const };
      }
      return {
        data: fallbackStudents.filter((s) => s.class === className),
        source: "fallback" as const,
      };
    })
  );

  return {
    data: perClass.flatMap((r) => r.data),
    source: combineSources(perClass.map((r) => r.source)),
  };
}
