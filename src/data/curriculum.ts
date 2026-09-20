export interface CurriculumSubject {
  id: string;
  subject: string;
  teacher: string;
  icon: string;
  discordUrl: string;
}

export const curriculumSubjects: CurriculumSubject[] = [
  {
    id: "tata-boga",
    subject: "TATA BOGA",
    teacher: "Audrey",
    icon: "chef-hat",
    discordUrl: "https://discord.gg/rGFdf3MJy",
  },
  {
    id: "seni-rupa",
    subject: "SENI RUPA",
    teacher: "Kuzo Yamakage",
    icon: "palette",
    discordUrl: "https://discord.gg/u8pJUy5tE",
  },
  {
    id: "film",
    subject: "SENI FILM, TELEVISI DAN KONTEN",
    teacher: "Edgard Kiss",
    icon: "clapperboard",
    discordUrl: "https://discord.gg/HSdWXWg6g",
  },
  {
    id: "bk",
    subject: "BIMBINGAN KONSELING",
    teacher: "Sora Star",
    icon: "heart-handshake",
    discordUrl: "https://discord.gg/46fuUUGxe",
  },
  {
    id: "design",
    subject: "DESIGN",
    teacher: "Toby Franco / Boy Habibi",
    icon: "pen-tool",
    discordUrl: "https://discord.gg/EmfDdyXcT",
  },
  {
    id: "musik",
    subject: "SENI MUSIK",
    teacher: "Selena Gomez",
    icon: "music",
    discordUrl: "https://discord.gg/xFx4W7QcD",
  },
  {
    id: "inggris",
    subject: "INGGRIS",
    teacher: "Metalita Grant",
    icon: "languages",
    discordUrl: "https://discord.gg/nxC7pUnRc",
  },
];

export const curriculumSchedule = {
  time: "20:00 WIB",
  duration: "30 MENIT",
};

export interface Coach {
  id: string;
  name: string;
  icon: string;
}

export const coaches: Coach[] = [
  { id: "monkey", name: "The Monkey", icon: "swords" },
  { id: "yb", name: "Yb", icon: "swords" },
  { id: "jarjit", name: "Jarjit", icon: "swords" },
  { id: "ryu", name: "Ryu", icon: "swords" },
  { id: "marv", name: "Marv", icon: "swords" },
];

export const coachingMaterials: string[] = [
  "Fighting Mechanics",
  "Mobile Mechanics",
  "PC Mechanics",
  "Fighting Practice",
  "Mentality",
  "Tournament Preparation",
];
