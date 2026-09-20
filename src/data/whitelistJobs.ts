import type { SheetRow } from "@/lib/sheets";
import { DISCORD_INVITE } from "./classes";

export type WhitelistJobAccent = "red" | "gold" | "blue" | "purple" | "green" | "gray";

const VALID_ACCENTS: WhitelistJobAccent[] = ["red", "gold", "blue", "purple", "green", "gray"];

export interface WhitelistJob {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  buttonLabel: string;
  buttonUrl: string;
  accent: WhitelistJobAccent;
}

export const fallbackWhitelistJobs: WhitelistJob[] = [
  {
    id: "hoken-shitsu",
    name: "Hoken-Shitsu",
    description:
      "Hoken-shitsu adalah pusat kesehatan Kishin High Academy. Mereka bertugas memberikan pertolongan pertama kepada siswa yang terluka, kelelahan, atau sakit. Dalam situasi darurat maupun setelah bentrokan antar kelompok, mereka menjadi pihak netral yang selalu siap membantu siapa pun.",
    photoUrl: "",
    buttonLabel: "Pilih peran",
    buttonUrl: "https://discord.gg/gmNcAtT2A",
    accent: "red",
  },
  {
    id: "ichiran",
    name: "Ichiran",
    description:
      "Ichiran adalah restoran Jepang terkenal yang dikenal dengan masakan autentik dan cita rasa yang lezat. Dari ramen hangat hingga berbagai hidangan khas Jepang, setiap makanan dibuat dengan resep yang dijaga dan penuh perhatian. Restoran ini menjadi tempat favorit banyak orang, bukan hanya karena makanannya yang enak, tetapi juga karena pelayanan dan suasananya yang nyaman.",
    photoUrl: "",
    buttonLabel: "Pilih peran",
    buttonUrl: "https://discord.gg/tQnrbFFP9",
    accent: "gold",
  },
  {
    id: "seitokai",
    name: "Seitokai",
    description:
      "Seitokai merupakan organisasi resmi sekolah yang menjaga ketertiban di lingkungan akademi. Mereka mengawasi aktivitas siswa, membantu penyelenggaraan acara sekolah, dan memastikan seluruh peraturan dipatuhi. Walaupun tidak sekuat kelompok jalanan, pengaruh mereka sangat besar karena memiliki legitimasi dari pihak sekolah.",
    photoUrl: "",
    buttonLabel: "Pilih peran",
    buttonUrl: "https://discord.gg/EEN6sV5BR",
    accent: "gold",
  },
];

export function mapWhitelistJobRow(row: SheetRow): WhitelistJob | null {
  if (!row.name) return null;
  const accent = row.accent?.trim().toLowerCase() as WhitelistJobAccent;

  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim(),
    description: row.description?.trim() || "",
    photoUrl: row.photoUrl?.trim() || "",
    buttonLabel: row.buttonLabel?.trim() || "Pilih peran",
    buttonUrl: row.buttonUrl?.trim() || DISCORD_INVITE,
    accent: VALID_ACCENTS.includes(accent) ? accent : "gold",
  };
}
