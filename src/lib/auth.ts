import type { Session } from "next-auth";

/** The shape every page/component reads - same field names regardless of role. */
export type AuthUser = Session["user"];

/** Composed display status for a teacher/coach - mirrors the old Sheets-login label. */
export function teacherStatusLabel(
  role: "TEACHER" | "COACH",
  subject: string,
  homeroomClass?: string | null
): string {
  if (homeroomClass) return `WALI KELAS - ${homeroomClass}`;
  return `${role === "COACH" ? "COACH" : "GURU"} - ${subject}`;
}
