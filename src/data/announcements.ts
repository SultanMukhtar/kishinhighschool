import type { SheetRow } from "@/lib/sheets";

export interface Announcement {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
}

export const fallbackAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Pembukaan Pendaftaran Murid Baru Kishin High School",
    category: "SCHOOL",
    date: "2026-09-19",
    content:
      "Kishin High School resmi membuka pendaftaran murid baru untuk seluruh calon siswa/siswi. Silakan ikuti panduan pendaftaran melalui Discord server utama TST Collective dan lengkapi seluruh ketentuan yang berlaku.",
  },
  {
    id: "2",
    title: "Jadwal Primetime Roleplay Diperbarui",
    category: "RULES",
    date: "2026-09-15",
    content:
      "Primetime RP Kishin High School berlaku pada pukul 19:00 - 02:00 WIB setiap harinya. Seluruh siswa/siswi diharapkan aktif dan mematuhi jam operasional roleplay ini.",
  },
  {
    id: "3",
    title: "Pembukaan Coaching Clinic Angkatan Baru",
    category: "EVENT",
    date: "2026-09-10",
    content:
      "Coaching Clinic kini dibuka untuk seluruh murid yang ingin memperdalam kemampuan fighting mechanics, mobile mechanics, dan PC mechanics bersama coach berpengalaman kami.",
  },
  {
    id: "4",
    title: "Pengumuman Wali Kelas Sementara Dalam Persiapan",
    category: "CLASS",
    date: "2026-09-05",
    content:
      "Seluruh ruang kelas (Class A - Class International) saat ini berstatus LOCKED / RESTRICTED selama masa persiapan angkatan. Pantau terus pengumuman Discord untuk informasi pembukaan kelas.",
  },
];

export function mapAnnouncementRow(row: SheetRow): Announcement | null {
  if (!row.title) return null;
  return {
    id: row.id?.trim() || row.title.trim().toLowerCase().replace(/\s+/g, "-"),
    title: row.title.trim(),
    category: row.category?.trim().toUpperCase() || "SCHOOL",
    date: row.date?.trim() || "",
    content: row.content?.trim() || "",
  };
}

/** Sorted newest first by date string (YYYY-MM-DD sorts correctly lexically). */
export function sortAnnouncementsByDateDesc(items: Announcement[]): Announcement[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}
