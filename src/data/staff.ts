import type { SheetRow } from "@/lib/sheets";

/**
 * One tab (`Staff`) holds three kinds of rows at once, told apart by
 * `rowType` - same pattern as the class tabs' CLASS_INFO/STUDENT split:
 *   - KAICHOU      -> exactly one row, the school's top authority figure
 *   - SENSEI_GROUP -> exactly one row, the shared "sensei" collective card
 *   - SENSEI       -> any number of rows, individual mentor profiles
 */
export type StaffRowType = "KAICHOU" | "SENSEI_GROUP" | "SENSEI";

export interface StaffMember {
  id: string;
  rowType: StaffRowType;
  /** For rowType=SENSEI this is the bare name - the UI prefixes "Sensei ". */
  name: string;
  /** Badge text for KAICHOU/SENSEI_GROUP, or the colored subtitle for SENSEI. */
  roleLabel: string;
  description: string;
  photoUrl: string;
}

export const fallbackStaff: StaffMember[] = [
  {
    id: "kaichou",
    rowType: "KAICHOU",
    name: "Boy Habibi",
    roleLabel: "KAICHOU",
    description:
      "Kaichou adalah pemegang otoritas tertinggi di Kishin High School. Seluruh keputusan besar berada di tangannya, mulai dari pengangkatan guru, pembentukan organisasi baru, hingga penyelesaian konflik antar kelompok. Ia jarang turun tangan secara langsung, namun setiap keputusannya mampu mengubah arah sekolah. Bagi semua murid school, Kaichou adalah simbol ketertiban dan kekuasaan.",
    photoUrl: "",
  },
  {
    id: "sensei-group",
    rowType: "SENSEI_GROUP",
    name: "Sensei khs",
    roleLabel: "SENSEI",
    description:
      "Sensei bukanlah seorang guru biasa. Ia pernah menjadi bagian dari lingkungan keras yang membuatnya memahami bagaimana seseorang bisa berubah karena lingkungan, pertemanan, maupun ambisi. Setelah meninggalkan masa lalunya, ia memilih kembali ke dunia pendidikan dengan satu tujuan: membentuk murid-murid Kishin menjadi seseorang yang memiliki prinsip dan mampu bertanggung jawab atas pilihan mereka sendiri.",
    photoUrl: "",
  },
  {
    id: "sensei-rx-king",
    rowType: "SENSEI",
    name: "RX King",
    roleLabel: "Wali Class A",
    description: "Tegas, strategis, dan selalu tenang.",
    photoUrl: "",
  },
  {
    id: "sensei-puther-marino",
    rowType: "SENSEI",
    name: "Puther Marino",
    roleLabel: "Wali Class B",
    description: "Elegan, tajam, dan penuh rasa ingin tahu.",
    photoUrl: "",
  },
  {
    id: "sensei-edgar-kiss",
    rowType: "SENSEI",
    name: "Edgar Kiss",
    roleLabel: "Wali Class C",
    description: "Bersemangat, disiplin, dan suportif.",
    photoUrl: "",
  },
  {
    id: "sensei-toby-franco",
    rowType: "SENSEI",
    name: "Toby Franco",
    roleLabel: "Wali Class D",
    description: "Analitis, tenang, dan suka bereksperimen.",
    photoUrl: "",
  },
  {
    id: "sensei-marv",
    rowType: "SENSEI",
    name: "Marv",
    roleLabel: "Wali Class E",
    description: "Bijaksana, reflektif, dan berwibawa.",
    photoUrl: "",
  },
  {
    id: "sensei-selena-gomez",
    rowType: "SENSEI",
    name: "Selena Gomez",
    roleLabel: "Seni Music",
    description: "Hangat, empatik, dan sangat peka.",
    photoUrl: "",
  },
  {
    id: "sensei-pity-szayel",
    rowType: "SENSEI",
    name: "Pity Szayel",
    roleLabel: "Pembina Klub",
    description: "Keras, loyal, dan melindungi muridnya.",
    photoUrl: "",
  },
];

const VALID_ROW_TYPES: StaffRowType[] = ["KAICHOU", "SENSEI_GROUP", "SENSEI"];

export function mapStaffRow(row: SheetRow): StaffMember | null {
  const rowType = row.rowType?.trim().toUpperCase() as StaffRowType;
  if (!VALID_ROW_TYPES.includes(rowType) || !row.name) return null;

  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    rowType,
    name: row.name.trim(),
    roleLabel: row.roleLabel?.trim() || "",
    description: row.description?.trim() || "",
    photoUrl: row.photoUrl?.trim() || "",
  };
}

export interface GroupedStaff {
  kaichou?: StaffMember;
  senseiGroup?: StaffMember;
  senseiList: StaffMember[];
}

export function groupStaff(members: StaffMember[]): GroupedStaff {
  return {
    kaichou: members.find((m) => m.rowType === "KAICHOU"),
    senseiGroup: members.find((m) => m.rowType === "SENSEI_GROUP"),
    senseiList: members.filter((m) => m.rowType === "SENSEI"),
  };
}
