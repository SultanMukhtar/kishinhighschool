import type { SheetRow } from "@/lib/sheets";

export interface Facility {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  status: string;
}

export const fallbackFacilities: Facility[] = [
  {
    id: "dojo",
    name: "Dojo",
    icon: "swords",
    category: "COMBAT TRAINING",
    description: "Ruang latihan bela diri dan fighting untuk seluruh siswa Kishin High School.",
    status: "AVAILABLE",
  },
  {
    id: "dante",
    name: "Dante",
    icon: "utensils",
    category: "CANTEEN",
    description: "Tempat makan dan berkumpul para siswa selama jam istirahat sekolah.",
    status: "AVAILABLE",
  },
  {
    id: "gakuranmart",
    name: "GakuranMart",
    icon: "store",
    category: "CONVENIENCE STORE",
    description: "Minimarket sekolah tempat siswa dapat membeli kebutuhan sehari-hari.",
    status: "AVAILABLE",
  },
  {
    id: "basket",
    name: "Lapangan Basket",
    icon: "circle-dot",
    category: "SPORTS",
    description: "Lapangan olahraga basket untuk kegiatan ekstrakurikuler dan latihan fisik.",
    status: "AVAILABLE",
  },
  {
    id: "voli",
    name: "Lapangan Voli",
    icon: "volleyball",
    category: "SPORTS",
    description: "Lapangan olahraga voli untuk kegiatan ekstrakurikuler siswa.",
    status: "AVAILABLE",
  },
  {
    id: "ruang-kelas",
    name: "Ruang Kelas",
    icon: "book-open",
    category: "ACADEMIC",
    description: "Ruang belajar virtual untuk seluruh kegiatan kurikulum Kishin High School.",
    status: "AVAILABLE",
  },
  {
    id: "principal",
    name: "Principal School",
    icon: "landmark",
    category: "ADMINISTRATION",
    description: "Kantor kepala sekolah dan pusat administrasi Kishin High School.",
    status: "RESTRICTED",
  },
  {
    id: "maid-cafe",
    name: "Maid Cafe",
    icon: "coffee",
    category: "CAFE",
    description: "Kafe bertema maid tempat siswa dapat bersantai, mengobrol, dan menikmati waktu istirahat.",
    status: "AVAILABLE",
  },
  {
    id: "club-akuma",
    name: "Club Akuma",
    icon: "skull",
    category: "CLUB",
    description: "Klub eksklusif dengan aura gelap dan misterius, tempat berkumpulnya kelompok tertentu di lingkungan sekolah.",
    status: "RESTRICTED",
  },
  {
    id: "karaoke-center",
    name: "Karaoke Center",
    icon: "mic",
    category: "ENTERTAINMENT",
    description: "Tempat siswa berkumpul untuk bernyanyi dan bersantai bersama teman-teman di luar jam pelajaran.",
    status: "AVAILABLE",
  },
  {
    id: "gymnasium",
    name: "Gymnasium",
    icon: "dumbbell",
    category: "SPORTS",
    description: "Ruang kebugaran dan latihan fisik untuk menunjang stamina serta kekuatan siswa.",
    status: "AVAILABLE",
  },
];

export function mapFacilityRow(row: SheetRow): Facility | null {
  if (!row.name) return null;
  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim(),
    icon: row.icon?.trim().toLowerCase() || "building-2",
    category: row.category?.trim().toUpperCase() || "",
    description: row.description?.trim() || "",
    status: row.status?.trim().toUpperCase() || "AVAILABLE",
  };
}
