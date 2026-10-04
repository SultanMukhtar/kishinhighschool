import type { SheetRow } from "@/lib/sheets";

export type TeacherAccountStatus = "ACTIVE" | "INACTIVE";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  role: "TEACHER" | "COACH";
  /** Login fields - mirrors the student identity pattern. */
  icName: string;
  robloxUsername: string;
  discordUsername: string;
  age: number;
  /** Homeroom class this teacher is Wali Kelas of. Empty if not tied to one class. */
  class: string;
  /** Login gate, set by admin in the sheet - INACTIVE cannot sign in. */
  status: TeacherAccountStatus;
}

const VALID_STATUSES: TeacherAccountStatus[] = ["ACTIVE", "INACTIVE"];

export const fallbackTeachers: Teacher[] = [
  {
    id: "t1",
    name: "Audrey",
    subject: "TATA BOGA",
    role: "TEACHER",
    icName: "Audrey",
    robloxUsername: "AudreyRBLX",
    discordUsername: "audrey",
    age: 28,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "t2",
    name: "Kuzo Yamakage",
    subject: "SENI RUPA",
    role: "TEACHER",
    icName: "Kuzo Yamakage",
    robloxUsername: "KuzoYamakageRBLX",
    discordUsername: "kuzoyamakage",
    age: 31,
    class: "CLASS A",
    status: "ACTIVE",
  },
  {
    id: "t3",
    name: "Edgard Kiss",
    subject: "SENI FILM, TELEVISI DAN KONTEN",
    role: "TEACHER",
    icName: "Edgard Kiss",
    robloxUsername: "EdgardKissRBLX",
    discordUsername: "edgardkiss",
    age: 33,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "t4",
    name: "Sora Star",
    subject: "BIMBINGAN KONSELING",
    role: "TEACHER",
    icName: "Sora Star",
    robloxUsername: "SoraStarRBLX",
    discordUsername: "sorastar",
    age: 29,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "t5",
    name: "Toby Franco / Boy Habibi",
    subject: "DESIGN",
    role: "TEACHER",
    icName: "Toby Franco",
    robloxUsername: "TobyFrancoRBLX",
    discordUsername: "tobyfranco",
    age: 30,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "t6",
    name: "Selena Gomez",
    subject: "SENI MUSIK",
    role: "TEACHER",
    icName: "Selena Gomez",
    robloxUsername: "SelenaGomezRBLX",
    discordUsername: "selenagomez",
    age: 27,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "c1",
    name: "The Monkey",
    subject: "FIGHTING MECHANICS",
    role: "COACH",
    icName: "The Monkey",
    robloxUsername: "TheMonkeyRBLX",
    discordUsername: "themonkey",
    age: 25,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "c2",
    name: "Yb",
    subject: "MOBILE MECHANICS",
    role: "COACH",
    icName: "Yb",
    robloxUsername: "YbRBLX",
    discordUsername: "yb",
    age: 24,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "c3",
    name: "Jarjit",
    subject: "PC MECHANICS",
    role: "COACH",
    icName: "Jarjit",
    robloxUsername: "JarjitRBLX",
    discordUsername: "jarjit",
    age: 26,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "c4",
    name: "Ryu",
    subject: "FIGHTING PRACTICE",
    role: "COACH",
    icName: "Ryu",
    robloxUsername: "RyuRBLX",
    discordUsername: "ryu",
    age: 28,
    class: "",
    status: "ACTIVE",
  },
  {
    id: "c5",
    name: "Marv",
    subject: "MENTALITY & TOURNAMENT PREPARATION",
    role: "COACH",
    icName: "Marv",
    robloxUsername: "MarvRBLX",
    discordUsername: "marv",
    age: 32,
    class: "",
    status: "ACTIVE",
  },
];

export function mapTeacherRow(row: SheetRow): Teacher | null {
  if (!row.name) return null;
  const role = row.role?.trim().toUpperCase();
  const age = Number(row.age);
  const status = row.status?.trim().toUpperCase() as TeacherAccountStatus;

  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim(),
    subject: row.subject?.trim() || "",
    role: role === "COACH" ? "COACH" : "TEACHER",
    icName: row.icName?.trim() || row.name.trim(),
    robloxUsername: row.robloxUsername?.trim() || "",
    discordUsername: row.discordUsername?.trim() || "",
    age: Number.isFinite(age) ? age : 0,
    class: row.class?.trim().toUpperCase() || "",
    status: VALID_STATUSES.includes(status) ? status : "ACTIVE",
  };
}
