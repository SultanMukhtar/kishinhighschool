import type { SheetRow } from "@/lib/sheets";

export interface Extracurricular {
  id: string;
  name: string;
  icon: string;
  description: string;
  /** Optional photo link - when set, shown instead of the icon tile. */
  photoUrl: string;
}

export const fallbackExtracurriculars: Extracurricular[] = [
  {
    id: "karate",
    name: "KARATE",
    icon: "swords",
    description: "Melatih kedisiplinan, ketangkasan, keberanian, dan sportivitas.",
    photoUrl: "",
  },
  {
    id: "music",
    name: "MUSIC",
    icon: "music",
    description: "Mengembangkan kreativitas dan bakat dalam bidang musik.",
    photoUrl: "",
  },
  {
    id: "catur",
    name: "CATUR",
    icon: "puzzle",
    description: "Mengasah konsentrasi, strategi, logika, dan kemampuan berpikir.",
    photoUrl: "",
  },
  {
    id: "art",
    name: "ART",
    icon: "palette",
    description: "Menyalurkan kreativitas melalui seni dan berbagai karya.",
    photoUrl: "",
  },
  {
    id: "pecinta-alam",
    name: "PECINTA ALAM",
    icon: "trees",
    description: "Membangun kepedulian terhadap lingkungan dan alam.",
    photoUrl: "",
  },
  {
    id: "kesehatan",
    name: "KESEHATAN",
    icon: "heart-pulse",
    description: "Meningkatkan kesadaran tentang pentingnya menjaga kesehatan.",
    photoUrl: "",
  },
  {
    id: "sastra-jepang",
    name: "SASTRA JEPANG",
    icon: "languages",
    description: "Mengembangkan kemampuan bahasa, sastra, dan budaya Jepang.",
    photoUrl: "",
  },
  {
    id: "sastra-inggris",
    name: "SASTRA INGGRIS",
    icon: "book-open-text",
    description: "Mengembangkan kemampuan bahasa, sastra, membaca, dan kreativitas.",
    photoUrl: "",
  },
  {
    id: "basketball",
    name: "BASKETBALL",
    icon: "circle-dot",
    description: "Mengembangkan kerja sama tim, strategi, dan sportivitas.",
    photoUrl: "",
  },
  {
    id: "volleyball",
    name: "VOLLEYBALL",
    icon: "circle-dot",
    description: "Melatih kekompakan, komunikasi, ketangkasan, dan kerja sama tim.",
    photoUrl: "",
  },
];

export function mapExtracurricularRow(row: SheetRow): Extracurricular | null {
  if (!row.name) return null;
  return {
    id: row.id?.trim() || row.name.trim().toLowerCase().replace(/\s+/g, "-"),
    name: row.name.trim().toUpperCase(),
    icon: row.icon?.trim().toLowerCase() || "sparkles",
    description: row.description?.trim() || "",
    photoUrl: row.photoUrl?.trim() || "",
  };
}
