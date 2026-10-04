import type { SheetRow } from "@/lib/sheets";

export type StudentStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "GRADUATED";

export interface Student {
  id: string;
  icName: string;
  robloxUsername: string;
  discordUsername: string;
  class: string;
  age: number;
  status: StudentStatus;
}

const VALID_STATUSES: StudentStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED", "GRADUATED"];

export const fallbackStudents: Student[] = [
  {
    id: "KHS001",
    icName: "Ren Kurosawa",
    robloxUsername: "RenKurosawaRBLX",
    discordUsername: "renkurosawa",
    class: "CLASS A",
    age: 17,
    status: "ACTIVE",
  },
  {
    id: "KHS002",
    icName: "Aiko Tanaka",
    robloxUsername: "AikoTanakaRBLX",
    discordUsername: "aikotanaka",
    class: "CLASS B",
    age: 16,
    status: "ACTIVE",
  },
  {
    id: "KHS003",
    icName: "Haruto Sato",
    robloxUsername: "HarutoSatoRBLX",
    discordUsername: "harutosato",
    class: "CLASS C",
    age: 18,
    status: "ACTIVE",
  },
  {
    id: "KHS004",
    icName: "Yuki Nakamura",
    robloxUsername: "YukiNakamuraRBLX",
    discordUsername: "yukinakamura",
    class: "CLASS D",
    age: 17,
    status: "ACTIVE",
  },
  {
    id: "KHS005",
    icName: "Sora Ichinose",
    robloxUsername: "SoraIchinoseRBLX",
    discordUsername: "soraichinose",
    class: "CLASS E",
    age: 16,
    status: "ACTIVE",
  },
  {
    id: "KHS006",
    icName: "Emily Carter",
    robloxUsername: "EmilyCarterRBLX",
    discordUsername: "emilycarter",
    class: "CLASS INTERNATIONAL",
    age: 17,
    status: "ACTIVE",
  },
  {
    id: "KHS007",
    icName: "Kenji Watanabe",
    robloxUsername: "KenjiWatanabeRBLX",
    discordUsername: "kenjiwatanabe",
    class: "CLASS A",
    age: 18,
    status: "SUSPENDED",
  },
  {
    id: "KHS008",
    icName: "Mio Fujimoto",
    robloxUsername: "MioFujimotoRBLX",
    discordUsername: "miofujimoto",
    class: "CLASS B",
    age: 16,
    status: "ACTIVE",
  },
];

/**
 * Pure row -> Student mapper. Client-safe (no sheet-fetching code pulled in).
 * `classNameOverride` is used when reading a per-class roster tab, where the
 * class is implied by which tab the row came from (row.class is not needed).
 */
export function mapStudentRow(row: SheetRow, classNameOverride?: string): Student | null {
  const className = classNameOverride ?? row.class;
  if (!row.icName || !className) return null;
  const age = Number(row.age);
  const status = row.status?.trim().toUpperCase() as StudentStatus;

  return {
    id: row.id?.trim() || row.icName.trim(),
    icName: row.icName.trim(),
    robloxUsername: row.robloxUsername?.trim() || "",
    discordUsername: row.discordUsername?.trim() || "",
    class: className.trim().toUpperCase(),
    age: Number.isFinite(age) ? age : 0,
    status: VALID_STATUSES.includes(status) ? status : "ACTIVE",
  };
}
