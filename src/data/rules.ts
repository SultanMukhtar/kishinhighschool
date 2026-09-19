export interface RuleSection {
  id: string;
  title: string;
  points: string[];
}

export const rules: RuleSection[] = [
  {
    id: "general",
    title: "GENERAL",
    points: [
      "Wajib menghormati sesama pemain baik di dalam maupun di luar roleplay.",
      "Dilarang melakukan tindakan toxic, spam, atau flexing berlebihan di chat manapun.",
      "Wajib mengikuti seluruh arahan dari Management, Staff, dan Guru Kishin High School.",
      "Dilarang membahas topik SARA, politik, dan konten sensitif lainnya di dalam server.",
      "Setiap pemain wajib memahami dan mematuhi seluruh sistem yang berlaku di Kishin High School.",
    ],
  },
  {
    id: "mixing",
    title: "MIXING",
    points: [
      "Dilarang mencampurkan logika dunia nyata (OOC) dengan logika roleplay (IC) secara sengaja.",
      "Dilarang menggunakan informasi OOC (Discord call, screen share, dsb) untuk keuntungan IC.",
      "Segala bentuk mixing yang terbukti akan dikenakan sanksi sesuai ketentuan Management.",
    ],
  },
  {
    id: "nvl",
    title: "NON VALUE LIFE (NVL)",
    points: [
      "Setiap karakter wajib menghargai nyawa karakternya sendiri sesuai logika roleplay.",
      "Dilarang bersikap seolah karakter tidak memiliki rasa takut terhadap ancaman nyata (senjata, kekerasan, dsb).",
      "Karakter yang terluka parah wajib merespons dengan reaksi RP yang wajar, bukan mengabaikannya.",
    ],
  },
  {
    id: "nrf",
    title: "NON RP FEAR",
    points: [
      "Karakter wajib menunjukkan rasa takut yang wajar ketika berada dalam situasi mengancam nyawa.",
      "Dilarang melawan balik secara tidak logis ketika berada dalam posisi kalah jumlah atau kalah senjata.",
      "Reaksi karakter harus selalu realistis mengikuti tekanan situasi roleplay yang sedang berlangsung.",
    ],
  },
  {
    id: "frp",
    title: "FORCE ROLEPLAY",
    points: [
      "Dilarang memaksakan hasil roleplay atau aksi karakter lain tanpa persetujuan/interaksi yang wajar.",
      "Setiap aksi yang berdampak besar terhadap karakter lain harus melalui alur RP yang jelas dan adil.",
      "Dilarang mendikte emosi, tindakan, atau keputusan karakter milik pemain lain.",
    ],
  },
  {
    id: "multi-character",
    title: "MULTI CHARACTER",
    points: [
      "Setiap pemain hanya diperbolehkan memiliki satu identitas karakter aktif dalam satu waktu.",
      "Dilarang menggunakan lebih dari satu akun untuk berinteraksi dalam roleplay yang sama secara bersamaan.",
      "Pelanggaran multi-character dapat berujung pada pencabutan status siswa secara permanen.",
    ],
  },
  {
    id: "cheating",
    title: "CHEATING & HACKING",
    points: [
      "Dilarang keras menggunakan exploit, script, macro, atau bentuk kecurangan lainnya.",
      "Dilarang memanfaatkan bug atau glitch permainan untuk keuntungan pribadi maupun kelompok.",
      "Pelanggaran ini akan dikenakan sanksi berat berupa blacklist permanen dari Kishin High School.",
    ],
  },
  {
    id: "sexual",
    title: "SEXUAL",
    points: [
      "Dilarang keras melakukan roleplay bermuatan seksual dalam bentuk apapun di dalam server.",
      "Dilarang mengirimkan konten dewasa, vulgar, atau tidak pantas di seluruh channel Discord maupun in-game.",
      "Pelanggaran kategori ini akan diproses tegas oleh tim Management tanpa toleransi.",
    ],
  },
  {
    id: "account-sharing",
    title: "ACCOUNT SHARING",
    points: [
      "Dilarang meminjamkan atau menggunakan akun Roblox/Discord milik orang lain untuk keperluan roleplay.",
      "Setiap identitas siswa terikat pada satu akun resmi yang telah terdaftar di data sekolah.",
      "Pelanggaran account sharing dapat mengakibatkan pencabutan identitas siswa dari sistem sekolah.",
    ],
  },
];
