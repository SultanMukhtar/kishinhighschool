# Kishin High School

Portal pengelolaan sekolah virtual untuk server Roblox **Gakuran Roleplay**, bertema Japanese Delinquent / Japanese High School.

Frontend-only - **tanpa database**. Data sekolah (Students, Classes, Teachers, Announcements, Facilities) dikelola lewat **Google Sheets** yang dipublikasikan sebagai CSV; sisanya (Rules, Curriculum, Coaching Clinic, School Information) tetap berupa static TypeScript object di [src/data/](src/data/). Session login disimpan di `localStorage` browser.

Tidak ada tab "Students" terpisah - daftar siswa per kelas hidup di tab kelasnya masing-masing (`ClassA`, `ClassB`, dst), supaya satu wali kelas cukup kelola satu tab miliknya sendiri.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Sebelum Google Sheets dikonfigurasi, website tetap berjalan normal menggunakan **data demo bawaan** (fallback) - lihat bagian Login di bawah.

## Login (data demo bawaan)

Halaman login punya dua portal (tab switcher di atas form): **SISWA** dan **GURU / COACH**. Tidak ada password di keduanya - identitas dicocokkan terhadap kolom-kolom di sheet.

Selama tab kelas belum dikonfigurasi, gunakan salah satu akun demo Siswa berikut:

| Nama IC | Class | Umur |
|---|---|---|
| Ren Kurosawa | CLASS A | 17 |
| Aiko Tanaka | CLASS B | 16 |
| Haruto Sato | CLASS C | 18 |

Login Siswa dicocokkan terhadap **Nama IC + Class + Umur**.

Login Guru/Coach dicocokkan terhadap **Nama IC + Roblox Username + Umur** (lihat kolom `icName`/`robloxUsername`/`age` di tab `Teachers`, bagian setup Google Sheets di bawah). Contoh akun demo Guru:

| Nama IC | Roblox Username | Umur |
|---|---|---|
| Kuzo Yamakage | KuzoYamakageRBLX | 31 |

Status yang tampil untuk akun Guru/Coach setelah login bukan status keanggotaan seperti siswa, melainkan label peran mereka - misalnya `WALI KELAS - CLASS A` (jika kolom `class` di sheet diisi) atau `GURU - SENI RUPA` / `COACH - FIGHTING MECHANICS` (jika tidak terikat satu kelas). Akun Guru/Coach juga tidak pernah kena penguncian fitur (feature lock) seperti siswa berstatus non-ACTIVE - staff selalu dapat akses penuh.

## Setup Google Sheets (pengelolaan data live)

Setelah setup ini selesai, staff cukup edit Google Sheet - website otomatis sinkron dalam ±60 detik tanpa perlu redeploy atau sentuh kode.

### 1. Buat spreadsheet dengan 14 tab

Buat satu Google Sheet baru, lalu buat tab (nama harus **persis**, case-sensitive):

- `ClassA`
- `ClassB`
- `ClassC`
- `ClassD`
- `ClassE`
- `ClassInternational`
- `SpecialClassrooms`
- `Teachers`
- `Announcements`
- `Facilities`
- `Media`
- `Staff`
- `WhitelistJobs`
- `Extracurriculars`

Struktur kolom tiap tab ada di bagian 2 dan 3 di bawah - buat header-nya persis seperti itu di baris pertama tiap tab.

### 2. Struktur kolom tiap tab Class (ClassA s/d ClassInternational)

Setiap tab kelas berisi **dua jenis baris sekaligus**, dibedakan lewat kolom `rowType` - bukan lewat posisi baris, jadi aman kalau baris ditambah/diurutkan ulang:

| Kolom | Dipakai untuk | Contoh |
|---|---|---|
| `rowType` | Penanda jenis baris - **wajib diisi** | `CLASS_INFO` atau `STUDENT` |
| `id` | ID unik (kelas atau siswa) | `class-a` / `KHS001` |
| `icName` | Nama IC siswa *(baris STUDENT saja)* | Ren Kurosawa |
| `robloxUsername` | Username Roblox siswa *(STUDENT saja)* | RenKurosawaRBLX |
| `discordUsername` | Username Discord siswa *(STUDENT saja)* | renkurosawa |
| `age` | Umur IC siswa *(STUDENT saja)* | 17 |
| `status` | **Status siswa** *(STUDENT saja)* | ACTIVE / SUSPENDED |
| `description` | Deskripsi kelas *(CLASS_INFO saja)* | RUANG KELAS SEDANG... |
| `classStatus` | **Status kelas** *(CLASS_INFO saja, beda dari `status` siswa!)* | LOCKED / RESTRICTED |
| `waliKelas` | Nama wali kelas *(CLASS_INFO saja)* | Menunggu Penunjukan Wali Kelas |
| `akses` | Info akses kelas *(CLASS_INFO saja)* | Menunggu Pengumuman Discord |
| `discordUrl` | Link Discord kelas *(CLASS_INFO saja, boleh kosong)* | https://discord.gg/... |
| `crewPhotoUrl` | Foto kru kelas untuk section "CLASS CREW" di halaman Class Directory *(CLASS_INFO saja, opsional)* | https://.../class-a.jpg |
| `crewNickname` | Julukan warna/identitas kelas, ditampilkan di bawah label "CLASS X" *(CLASS_INFO saja, opsional)* | Red |
| `crewLore` | Paragraf cerita/lore kelas untuk section "CLASS CREW" *(CLASS_INFO saja, opsional)* | Class A adalah Angkatan Pertama... |

Contoh isi tab `ClassA`:

| rowType | id | icName | robloxUsername | discordUsername | age | status | description | classStatus | waliKelas | akses | discordUrl | crewPhotoUrl | crewNickname | crewLore |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CLASS_INFO | class-a | | | | | | RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN | LOCKED | (nama wali kelas) | Menunggu Pengumuman Discord | https://discord.gg/... | https://.../class-a.jpg | Red | Class A adalah Angkatan Pertama KISHIN HIGH SCHOOL... |
| STUDENT | KHS001 | Ren Kurosawa | RenKurosawaRBLX | renkurosawa | 17 | ACTIVE | | | | | | | | |
| STUDENT | KHS007 | Kenji Watanabe | KenjiWatanabeRBLX | kenjiwatanabe | 18 | SUSPENDED | | | | | | | | |

Section "CLASS CREW" di halaman Class Directory hanya menampilkan kartu untuk kelas yang kolom `crewLore`-nya diisi - kosongkan ketiga kolom itu (seperti pada `ClassInternational`) kalau kelas tsb tidak perlu tampil di section ini.

Penting: **`status`** (kolom ke-7) selalu berarti status SISWA (ACTIVE/SUSPENDED/dst); **`classStatus`** selalu berarti status KELAS (LOCKED/RESTRICTED/OPEN). Jangan tertukar - keduanya sengaja dipisah jadi dua kolom berbeda supaya tidak bentrok dalam satu tab.

### 3. Struktur kolom tab lainnya

| Tab | Kolom |
|---|---|
| `SpecialClassrooms` | `id, name, status, discordUrl` |
| `Teachers` | `id, name, subject, role, icName, robloxUsername, discordUsername, age, class, status` |
| `Announcements` | `id, title, category, date, content` |
| `Facilities` | `id, name, icon, category, description, status` |
| `Media` | `logo, loginBg1, loginBg2, loginBg3, loginBg4, loginBg5, loginBg6` |
| `Staff` | `rowType, id, name, roleLabel, description, photoUrl` |
| `WhitelistJobs` | `id, name, description, photoUrl, buttonLabel, buttonUrl, accent` |
| `Extracurriculars` | `id, name, icon, description, photoUrl` |

Contoh isi tab `Teachers`:

| id | name | subject | role | icName | robloxUsername | discordUsername | age | class | status |
|---|---|---|---|---|---|---|---|---|---|
| t2 | Kuzo Yamakage | SENI RUPA | TEACHER | Kuzo Yamakage | KuzoYamakageRBLX | kuzoyamakage | 31 | CLASS A | ACTIVE |
| c1 | The Monkey | FIGHTING MECHANICS | COACH | The Monkey | TheMonkeyRBLX | themonkey | 25 | | ACTIVE |

Penjelasan kolom login di `Teachers`:
- `icName`, `robloxUsername`, `age` - dipakai untuk mencocokkan login di portal GURU/COACH (kalau `icName` dikosongkan, otomatis memakai isi kolom `name`).
- `class` - isi dengan nama kelas (`CLASS A`, dst) **hanya kalau** guru tsb adalah wali kelas dari kelas itu. Kosongkan untuk guru mata pelajaran umum / coach yang tidak terikat satu kelas.
- `status` di tab ini **bukan** status keanggotaan seperti siswa - ini saklar akses login: isi `ACTIVE` supaya bisa login, atau `INACTIVE` untuk memblokir login staff tsb (misalnya sudah tidak aktif) tanpa perlu menghapus datanya.

Tab `Staff` menampilkan section "KAICHOU (BOSS / KEPALA SEKOLAH)" dan "PROFIL SENSEI" di halaman School Information. Sama seperti tab Class, tab ini berisi **beberapa jenis baris sekaligus**, dibedakan lewat kolom `rowType`:

| Kolom | Dipakai untuk | Contoh |
|---|---|---|
| `rowType` | Penanda jenis baris - **wajib diisi** | `KAICHOU`, `SENSEI_GROUP`, atau `SENSEI` |
| `id` | ID unik | `kaichou` / `sensei-rx-king` |
| `name` | Nama. Untuk baris `SENSEI`, isi nama polos saja (**tanpa** kata "Sensei") - website otomatis menambahkan prefix "Sensei " di depannya | `Boy Habibi` / `RX King` |
| `roleLabel` | Untuk `KAICHOU`/`SENSEI_GROUP`: teks badge kecil di pojok foto. Untuk `SENSEI`: subjudul berwarna merah di bawah nama | `KAICHOU` / `SENSEI` / `Wali Class A` |
| `description` | Paragraf/kalimat deskripsi di bawah nama | (lihat contoh) |
| `photoUrl` | Link foto langsung (sama aturannya seperti kolom media di tab `Media` - lihat bagian di bawah) | https://.../foto.jpg |

Contoh isi tab `Staff`:

| rowType | id | name | roleLabel | description | photoUrl |
|---|---|---|---|---|---|
| KAICHOU | kaichou | Boy Habibi | KAICHOU | Kaichou adalah pemegang otoritas tertinggi di Kishin High School... | https://.../kaichou.jpg |
| SENSEI_GROUP | sensei-group | Sensei khs | SENSEI | Sensei bukanlah seorang guru biasa... | https://.../sensei-group.jpg |
| SENSEI | sensei-rx-king | RX King | Wali Class A | Tegas, strategis, dan selalu tenang. | https://.../rxking.jpg |
| SENSEI | sensei-puther-marino | Puther Marino | Wali Class B | Elegan, tajam, dan penuh rasa ingin tahu. | https://.../puther.jpg |

Baris `KAICHOU` dan `SENSEI_GROUP` masing-masing **cukup satu baris saja** (jadi dua kartu besar di bagian atas); baris `SENSEI` boleh sebanyak apapun (satu baris = satu kartu di grid "Profil Sensei"). Kalau `photoUrl` dikosongkan, kartu menampilkan placeholder ikon - situs tetap jalan normal.

Tab `WhitelistJobs` menampilkan section "WHITELIST JOBS" di halaman School Information (kartu peran seperti Hoken-Shitsu, Yasha, dst dengan tombol "Pilih peran"). Satu baris = satu kartu, boleh sebanyak apapun.

| Kolom | Dipakai untuk | Contoh |
|---|---|---|
| `id` | ID unik | `hoken-shitsu` |
| `name` | Nama peran | Hoken-Shitsu |
| `description` | Deskripsi peran | Hoken-shitsu adalah pusat kesehatan... |
| `photoUrl` | Link foto langsung (aturan sama seperti tab `Media`) | https://.../hoken-shitsu.jpg |
| `buttonLabel` | Teks tombol - kosongkan untuk pakai default "Pilih peran" | Pilih peran |
| `buttonUrl` | Link tujuan tombol (channel Discord pendaftaran peran, dst) - kosongkan untuk pakai link invite default | https://discord.com/channels/... |
| `accent` | Warna tombol "Pilih peran". Pilihan yang valid: `red`, `gold`, `blue`, `purple`, `green`, `gray`. Kosong atau nilai lain di luar itu otomatis jadi `gold` | red |

Tab `Extracurriculars` menampilkan section "EKSTRAKURIKULER" di halaman School Information (kartu ikon seperti Karate, Music, Catur, dst). Satu baris = satu kartu, boleh sebanyak apapun.

| Kolom | Dipakai untuk | Contoh |
|---|---|---|
| `id` | ID unik | `karate` |
| `name` | Nama ekstrakurikuler | KARATE |
| `icon` | Key ikon - salah satu dari: `swords`, `music`, `puzzle`, `palette`, `trees`, `heart-pulse`, `languages`, `book-open-text`, `circle-dot`. Kosong/tidak dikenal otomatis pakai ikon bintang | swords |
| `description` | Deskripsi singkat satu kalimat | Melatih kedisiplinan, ketangkasan, keberanian, dan sportivitas. |
| `photoUrl` | Link foto langsung (opsional, aturan sama seperti tab `Media`). Kalau diisi, kartu menampilkan foto tsb (dengan ikon kecil di pojok) menggantikan tampilan kotak ikon polos | https://.../karate.jpg |

Tab `Media` cuma berisi **satu baris data** (satu "profil media" untuk seluruh situs):

| logo | loginBg1 | loginBg2 | loginBg3 | loginBg4 | loginBg5 | loginBg6 |
|---|---|---|---|---|---|---|
| https://.../logo.png | https://.../bg1.jpg | https://.../bg2.jpg | ... | ... | ... | ... |

- `logo` - dipakai di semua tempat lambang sekolah muncul (loading screen, form login, sidebar, panel admin, foto profil siswa). Kosong = pakai placeholder kanji "刃".
- `loginBg1`...`loginBg6` - slide background halaman login. Boleh diisi kurang dari 6; slot yang kosong otomatis diisi gradient tema merah-hitam. Urutan slide mengikuti urutan kolom.
- Isi dengan **link gambar langsung** (URL yang kalau dibuka di tab baru langsung menampilkan gambar, bukan halaman preview) - link attachment Discord (`media.discordapp.net/attachments/...` atau `cdn.discordapp.com/attachments/...`), Imgur direct link, Google Drive "direct link", dll semua bisa dipakai.
- ⚠️ **Link attachment Discord yang disalin dari chat biasanya punya masa berlaku** (ditandai parameter `ex=` di URL) dan akan berhenti tampil setelah kedaluwarsa. Kalau gambar tiba-tiba hilang, cukup buka pesan Discord-nya lagi, copy link attachment yang baru, dan tempel ulang ke sel yang sama di sheet - tidak perlu ubah kode maupun redeploy.

Catatan umum:
- Baris `STUDENT` di tab kelas: `class`-nya otomatis mengikuti tab (tidak perlu kolom `class` terpisah).
- `status` STUDENT: `ACTIVE`, `INACTIVE`, `SUSPENDED`, atau `GRADUATED`.
- `role` Teachers: `TEACHER` atau `COACH`.
- `status` Teachers: `ACTIVE` (bisa login) atau `INACTIVE` (login diblokir).
- `name` pada baris `SENSEI` di tab Staff ditulis polos tanpa kata "Sensei" di depannya - website yang menambahkan otomatis.
- `icon` Facilities pakai salah satu key: `swords`, `utensils`, `store`, `circle-dot`, `volleyball`, `book-open`, `landmark`, `building-2`, `coffee`, `skull`, `mic`, `dumbbell`.
- Kolom `discordUrl` boleh dikosongkan - otomatis pakai link invite default (`src/data/classes.ts` → `DISCORD_INVITE`).
- Baris pertama tiap tab harus header (nama kolom), bukan data.

### 4. Publish setiap tab sebagai CSV

Untuk **setiap tab**:

1. Buka tab tersebut.
2. **File > Share > Publish to web**.
3. Dropdown pertama: pilih tab ini (misal "ClassA"), bukan "Entire Document".
4. Dropdown kedua: pilih **Comma-separated values (.csv)**.
5. Klik **Publish**, konfirmasi.
6. Copy link yang muncul - bentuknya seperti:
   `https://docs.google.com/spreadsheets/d/e/2PACX-xxxxxxxxxxxx/pub?gid=123456789&single=true&output=csv`
7. Ulangi untuk tab berikutnya (link dasarnya sama, hanya `gid` yang berbeda).

### 5. Tempel link ke kode

Buka [src/lib/sheetsConfig.ts](src/lib/sheetsConfig.ts), ganti setiap `PASTE_PUBLISHED_CSV_LINK_HERE` dengan link CSV dari tab yang sesuai:

```ts
export const SHEET_CSV_URLS: Record<SheetTab, string> = {
  classA: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=...&single=true&output=csv",
  classB: "...",
  classC: "...",
  classD: "...",
  classE: "...",
  classInternational: "...",
  specialClassrooms: "...",
  teachers: "...",
  announcements: "...",
  facilities: "...",
  media: "...",
  staff: "...",
  whitelistJobs: "...",
  extracurriculars: "...",
};
```

Simpan, restart `npm run dev` (atau redeploy). Selesai - dari sini, edit langsung di Google Sheets akan tampil di website tanpa perlu ubah kode lagi.

### Kalau sheet gagal diakses / kolom salah ketik

Website **tidak akan rusak**. Setiap tab yang belum dikonfigurasi, kosong, atau gagal di-fetch otomatis jatuh kembali (fallback) ke data demo bawaan di `src/data/*.ts` - per kelas, bukan semua-atau-tidak-sama-sekali (kalau `ClassC` bermasalah, `ClassA`/`ClassB`/dst tetap live). Cek panel `/admin`: tab Class List menampilkan badge kecil di tiap kartu kelas (hijau = live dari sheet, kuning = fallback), sementara tab lain menampilkan badge **LIVE FROM GOOGLE SHEETS** / **DEMO / FALLBACK DATA** / **SEBAGIAN DARI SHEETS, SEBAGIAN FALLBACK** di pojok atas untuk tahu sumber data yang sedang aktif.

## Dashboard mengikuti data siswa yang login

Setelah login, tampilan dan akses fitur menyesuaikan data siswa yang bersangkutan:

- **Kartu "Kelas Saya" di Dashboard** - otomatis menampilkan info kelas milik siswa yang login (deskripsi, wali kelas, link Discord dari tab kelasnya di sheet), dengan badge status memakai **status siswa itu sendiri** (ACTIVE/INACTIVE/SUSPENDED/GRADUATED) - bukan status persiapan kelas (LOCKED/RESTRICTED) yang berlaku umum untuk semua orang.
- **Highlight kelas sendiri di Class Directory** (`/classes`) - kartu kelas milik siswa yang login ditandai badge "KELAS ANDA" dan border menyala, dan badge status-nya juga ikut memakai status siswa yang login (jadi kalau siswanya `ACTIVE`, kartu kelasnya sendiri tidak lagi terlihat "LOCKED").
- **Fitur dikunci berdasarkan status siswa** - status `ACTIVE` dapat akses penuh; status lain (`INACTIVE`, `SUSPENDED`, `GRADUATED`) mengunci beberapa menu (ditandai ikon gembok di sidebar): Coaching Clinic, Class Directory, Report Player, dan khusus `SUSPENDED` juga mengunci Announcements. Dashboard, Student Profile, School Information, School Rules, **Curriculum**, Facilities, dan Settings selalu terbuka untuk semua status. Membuka langsung URL fitur yang terkunci akan menampilkan halaman "FITUR DIKUNCI", bukan konten aslinya.

Aturan kunci-per-status ini didefinisikan dalam satu tempat: [src/lib/permissions.ts](src/lib/permissions.ts) - ubah isi `LOCKED_BY_STATUS` di sana kalau kebijakan aksesnya perlu disesuaikan.

## Data yang masih static (tidak lewat spreadsheet)

- School Rules - [src/data/rules.ts](src/data/rules.ts)
- Curriculum & Coaching Clinic - [src/data/curriculum.ts](src/data/curriculum.ts)
- School Information / Discord guide / ketentuan pendaftaran - [src/data/school-info.ts](src/data/school-info.ts)

Edit langsung file-file ini kalau perlu diubah - tidak perlu backend atau migrasi apa pun.

## Management Panel

Route `/admin` dilindungi **kode akses** dan bersifat **view-only** (tidak ada kontrol edit apa pun di dalamnya).

- Sebelum kode dimasukkan, `/admin` hanya menampilkan layar "RESTRICTED AREA" - tidak ada data siswa/kelas/dll yang bocor ke halaman sama sekali.
- Kode akses default: `kishin-admin-2026`. Untuk mengganti (sangat disarankan sebelum deploy publik), set environment variable `ADMIN_ACCESS_CODE` (dan opsional `ADMIN_SESSION_SECRET` untuk memperkuat token sesi) di `.env.local` atau di pengaturan hosting-mu.
- Pengecekan kode terjadi di server ([src/lib/adminAuth.ts](src/lib/adminAuth.ts)) lewat cookie HttpOnly - kode dan token sesinya tidak pernah dikirim ke browser dalam bentuk yang bisa dibaca lewat dev tools, beda dengan gate berbasis JavaScript client-side.
- Sesi admin bertahan 8 jam atau sampai tombol **LOGOUT ADMIN** ditekan.
- Setelah masuk, panel menampilkan seluruh data (Student List - gabungan roster semua tab kelas, Class List, Teacher List, Announcement List, Facility List, Media) beserta sumbernya (sheet vs fallback), murni untuk dilihat. Tidak ada dropdown, tombol edit, atau simpanan lokal apa pun - untuk mengubah data apa pun (termasuk status siswa), satu-satunya cara adalah edit langsung di Google Sheets.

Catatan keamanan: karena situs ini tanpa backend/database, proteksi ini adalah penghalang akses kasual (orang iseng buka URL-nya), bukan keamanan tingkat produksi enterprise - jangan taruh kode akses default di lingkungan publik tanpa menggantinya lewat env var di atas.

## Media (logo & background)

Tidak ada file gambar lokal di `public/` - logo dan keenam background login sepenuhnya dikelola lewat tab `Media` di Google Sheets (lihat bagian Setup Google Sheets di atas). Sebelum tab itu dikonfigurasi, logo tampil sebagai placeholder kanji "刃" dan background login memakai gradient tema merah-hitam.
