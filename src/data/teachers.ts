import type { SheetRow } from "@/lib/sheets";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  role: "TEACHER" | "COACH";
}

export const fallbackTeachers: Teacher[] = [
  { id: "t1", name: "Audrey", subject: "TATA BOGA", role: "TEACHER" },
  { id: "t2", name: "Kuzo Yamakage", subject: "SENI RUPA", role: "TEACHER" },
  { id: "t3", name: "Edgard Kiss", subject: "SENI FILM, TELEVISI DAN KONTEN", role: "TEACHER" },
  { id: "t4", name: "Sora Star", subject: "BIMBINGAN KONSELING", role: "TEACHER" },
  { id: "t5", name: "Toby Franco / Boy Habibi", subject: "DESIGN", role: "TEACHER" },
  { id: "t6", name: "Selena Gomez", subject: "SENI MUSIK", role: "TEACHER" },
  { id: "c1", name: "The Monkey", subject: "FIGHTING MECHANICS", role: "COACH" },
  { id: "c2", name: "Yb", subject: "MOBILE MECHANICS", role: "COACH" },
  { id: "c3", name: "Jarjit", subject: "PC MECHANICS", role: "COACH" },
  { id: "c4", name: "Ryu", subject: "FIGHTING PRACTICE", role: "COACH" },
  { id: "c5", name: "Marv", subject: "MENTALITY & TOURNAMENT PREPARATION", role: "COACH" },
];

export function mapTeacherRow(row: SheetRow): Teacher | null {
  if (!row.name) return null;
  const role = row.role?.trim().toUpperCase();
  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim(),
    subject: row.subject?.trim() || "",
    role: role === "COACH" ? "COACH" : "TEACHER",
  };
}
