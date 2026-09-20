export const DISCORD_SERVER_URL = "https://discord.gg/xqtPvwhVV";

export const schoolMotto = "Disiplin membentuk nama. Solidaritas membentuk keluarga.";

export const backgroundStory = {
  eyebrow: "BACKGROUND STORY",
  title: "di balik gerbang merah Kishin",
  paragraphs: [
    "KISHIN HIGH SCHOOL merupakan sekolah elit yang dikenal karena menghasilkan lulusan terbaik sekaligus menjadi tempat lahirnya berbagai legenda. Di balik disiplin sekolah, terdapat persaingan, organisasi, perdagangan, hingga kelompok jalanan yang hidup berdampingan. Selama aturan utama sekolah tidak dilanggar, setiap kelompok bebas menjalankan pengaruhnya.",
    "Komunitas ini menjadi ruang bersama bagi pemain dan penonton untuk mengenal para tokoh, class crew, dan peran-peran penting yang menjaga kehidupan Kishin tetap hidup setiap hari.",
  ],
};

export const aboutSchool = {
  title: "ABOUT KISHIN HIGH SCHOOL",
  description:
    "SEBUAH RUANG (SEMI ROLEPLAY) YANG DIMANA SEKOLAH INI PARA SISWA DAN SISWI BISA MEMILIKI RUANG KOMPE FIGHT DAN RUANG BELAJAR VIRTUAL UNTUK MEMBERIKAN PENGALAMAN NYATA DI DALAM RUANG GAME ROBLOX KHUSUSNYA DI MAP GAKURAN.",
  objectives: [
    "Memberikan ruang bermain yang aman, nyaman dan menyenangkan di dalam server.",
    "Menjadi tempat ruang belajar virtual bagi para user yang tergabung ke dalam Kishin High School.",
  ],
};

export interface DiscordChannelGuideEntry {
  channel: string;
  description: string;
  url?: string;
}

export const discordChannelGuide: DiscordChannelGuideEntry[] = [
  {
    channel: "#WELCOME",
    description: "Channel sambutan untuk seluruh member baru server.",
    url: "https://discord.com/channels/1158678454896693248/1158678455672635485",
  },
  {
    channel: "#TAKEROLE",
    description: "Channel untuk mengambil role sesuai kebutuhan member.",
    url: "https://discord.com/channels/1158678454896693248/1321090092839735321",
  },
  {
    channel: "#SCHOOLCHAT",
    description: "Channel obrolan umum seputar Kishin High School.",
    url: "https://discord.com/channels/1158678454896693248/1430643373160534247",
  },
  {
    channel: "#MADINGSEKOLAH",
    description: "Papan pengumuman resmi Kishin High School.",
    url: "https://discord.com/channels/1158678454896693248/1549847706372022312",
  },
  {
    channel: "#CHATINGAME",
    description: "Channel obrolan yang terhubung dengan chat in-game.",
    url: "https://discord.com/channels/1158678454896693248/1548337346980872222",
  },
];

export interface RegistrationStep {
  text: string;
  url?: string;
}

export const registrationSteps: RegistrationStep[] = [
  { text: "Bergabung ke server utama TST." },
  { text: "Mengganti nama Discord menjadi nama IC." },
  {
    text: "Request role melalui #takerole.",
    url: "https://discord.com/channels/1158678454896693248/1321090092839735321",
  },
  {
    text: "Mengisi pendaftaran di #pendaftaranmurid.",
    url: "https://discord.com/channels/1158678454896693248/1536424667504709683",
  },
  { text: "Melakukan interview." },
  { text: "Mendapatkan role #classcrew." },
  { text: "Mendapatkan class." },
  { text: "Mengikuti roleplay ospek." },
];

export const systemRules = [
  "User wajib mematikan nametag.",
  "Dilarang berperilaku di luar logika Kishin High School.",
  "Dilarang menggunakan avatar berbeda gender dari yang terdaftar.",
  "Primetime RP: 19:00 - 02:00 WIB.",
  "Dilarang membuat group/ruang komunikasi lain yang berhubungan dengan Kishin High School di luar server utama TST Collective.",
];
