import type { SheetRow } from "@/lib/sheets";
import type { SheetTab } from "@/lib/sheetsConfig";

export const DISCORD_INVITE = "https://discord.gg/xqtPvwhVV";

export type ClassStatus = "LOCKED" | "RESTRICTED" | "OPEN";

export interface SchoolClass {
  id: string;
  name: string;
  description: string;
  status: string;
  waliKelas: string;
  akses: string;
  discordUrl: string;
  /** "Class Crew" lore section (Class Directory page) - all optional, a
   *  class with no crewLore simply doesn't get a crew card. */
  crewPhotoUrl: string;
  crewNickname: string;
  crewLore: string;
}

/**
 * Each entry is one Google Sheet tab that doubles as: row 1 = this class's
 * info (rowType=CLASS_INFO), rows below = its student roster (rowType=STUDENT).
 * Shared by classes.server.ts (class info) and students.server.ts (roster).
 */
export const CLASS_TAB_ORDER: { tab: SheetTab; className: string }[] = [
  { tab: "classA", className: "CLASS A" },
  { tab: "classB", className: "CLASS B" },
  { tab: "classC", className: "CLASS C" },
  { tab: "classD", className: "CLASS D" },
  { tab: "classE", className: "CLASS E" },
  { tab: "classInternational", className: "CLASS INTERNATIONAL" },
];

export const classOptions = CLASS_TAB_ORDER.map((c) => c.className);

export const fallbackClasses: SchoolClass[] = [
  {
    id: "class-a",
    name: "CLASS A",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "LOCKED",
    waliKelas: "Menunggu Penunjukan Wali Kelas",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "Red",
    crewLore:
      "Class A adalah Angkatan Pertama KISHIN HIGH SCHOOL, generasi yang menjadi awal berdirinya nama dan reputasi sekolah. Sejak hari pertama, mereka bukan sekadar murid - mereka adalah kelompok yang membentuk aturan, tradisi, serta harga diri sekolah. Nama mereka begitu disegani hingga setiap angkatan.",
  },
  {
    id: "class-b",
    name: "CLASS B",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "LOCKED",
    waliKelas: "Menunggu Penunjukan Wali Kelas",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "White",
    crewLore:
      "Class B bukan sekadar kelas. Kami adalah keluarga yang terbentuk dari kekacauan, persahabatan, dan loyalitas. Dan sekarang... kalau satu orang bergerak, semuanya ikut bergerak.",
  },
  {
    id: "class-c",
    name: "CLASS C",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "LOCKED",
    waliKelas: "Menunggu Penunjukan Wali Kelas",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "Purple",
    crewLore:
      "Class C awalnya hanyalah kumpulan murid yang tidak sengaja disatukan oleh pihak sekolah. Mereka berasal dari latar belakang, kelompok, dan sifat yang berbeda-beda - tidak pernah berniat menjadi satu kelompok. Namun, sekolah segera menyadari satu hal: hampir setiap murid di kelas ini memiliki kemampuan bertarung dan mental yang jauh di atas murid biasa.",
  },
  {
    id: "class-d",
    name: "CLASS D",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "LOCKED",
    waliKelas: "Menunggu Penunjukan Wali Kelas",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "Blue",
    crewLore:
      "Class D dikenal sebagai kelas yang paling sulit diatur di sekolah. Mereka sering melanggar aturan, membuat keributan, dan tidak pernah takut berhadapan dengan murid lain. Namun di balik sifat mereka yang brutal dan keras kepala, setiap anggota Class D memiliki kekuatan bertarung yang luar biasa. Mereka mungkin tidak disiplin, tetapi ketika terjadi masalah, mereka adalah salah satu kelas yang paling berbahaya.",
  },
  {
    id: "class-e",
    name: "CLASS E",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "RESTRICTED",
    waliKelas: "Menunggu Penunjukan Ketua Class",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "Gray",
    crewLore:
      "Class E adalah kelas terbaru dan berada di urutan paling terakhir di sekolah. Awalnya, banyak murid menganggap mereka sebagai kelas yang lemah dan tidak pantas diperhitungkan. Namun Class E justru memiliki satu hal yang tidak dimiliki kelas lain: mereka tidak takut kepada siapa pun.",
  },
  {
    id: "class-international",
    name: "CLASS INTERNATIONAL",
    description: "RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN",
    status: "LOCKED",
    waliKelas: "Menunggu Penunjukan Wali Kelas",
    akses: "Menunggu Pengumuman Discord",
    discordUrl: DISCORD_INVITE,
    crewPhotoUrl: "",
    crewNickname: "",
    crewLore: "",
  },
];

export interface SpecialClassroom {
  id: string;
  name: string;
  status: string;
  discordUrl: string;
}

export const fallbackSpecialClassrooms: SpecialClassroom[] = [
  { id: "tata-boga", name: "CLASS TATA BOGA", status: "LOCKED / RESTRICTED", discordUrl: DISCORD_INVITE },
  { id: "seni-rupa", name: "CLASS SENI RUPA", status: "LOCKED / RESTRICTED", discordUrl: DISCORD_INVITE },
  { id: "design", name: "CLASS DESIGN", status: "LOCKED / RESTRICTED", discordUrl: DISCORD_INVITE },
  { id: "film", name: "CLASS FILM", status: "LOCKED / RESTRICTED", discordUrl: DISCORD_INVITE },
  { id: "bk", name: "BIMBINGAN KONSELING", status: "RESTRICTED / SESI KHUSUS", discordUrl: DISCORD_INVITE },
  { id: "seni-musik", name: "CLASS SENI MUSIK", status: "OPEN FOR LEARNING", discordUrl: DISCORD_INVITE },
  { id: "inggris", name: "CLASS INGGRIS", status: "LOCKED / RESTRICTED", discordUrl: DISCORD_INVITE },
];

/**
 * Maps the CLASS_INFO row of a class tab. Note the column is `classStatus`,
 * not `status` - `status` on that same tab means STUDENT status, so the two
 * must never share a column name.
 */
export function mapClassRow(row: SheetRow, className: string): SchoolClass {
  return {
    id: row.id?.trim() || className.trim().toLowerCase().replace(/\s+/g, "-"),
    name: className.trim().toUpperCase(),
    description: row.description?.trim() || "",
    status: row.classStatus?.trim() || "LOCKED",
    waliKelas: row.waliKelas?.trim() || "Menunggu Penunjukan Wali Kelas",
    akses: row.akses?.trim() || "Menunggu Pengumuman Discord",
    discordUrl: row.discordUrl?.trim() || DISCORD_INVITE,
    crewPhotoUrl: row.crewPhotoUrl?.trim() || "",
    crewNickname: row.crewNickname?.trim() || "",
    crewLore: row.crewLore?.trim() || "",
  };
}

export function mapSpecialClassroomRow(row: SheetRow): SpecialClassroom | null {
  if (!row.name) return null;
  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim().toUpperCase(),
    status: row.status?.trim() || "LOCKED / RESTRICTED",
    discordUrl: row.discordUrl?.trim() || DISCORD_INVITE,
  };
}
