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

Selama tab kelas belum dikonfigurasi, gunakan salah satu akun demo berikut:

| Nama IC | Class | Umur |
|---|---|---|
| Ren Kurosawa | CLASS A | 17 |
| Aiko Tanaka | CLASS B | 16 |
| Haruto Sato | CLASS C | 18 |

Tidak ada password - identitas dicocokkan terhadap Nama IC, Class, dan Umur.

## Setup Google Sheets (pengelolaan data live)

Setelah setup ini selesai, staff cukup edit Google Sheet - website otomatis sinkron dalam ±60 detik tanpa perlu redeploy atau sentuh kode.

### 1. Buat spreadsheet dengan 11 tab

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

Contoh isi tab `ClassA`:

| rowType | id | icName | robloxUsername | discordUsername | age | status | description | classStatus | waliKelas | akses | discordUrl |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CLASS_INFO | class-a | | | | | | RUANG KELAS SEDANG DALAM PERSIAPAN ANGKATAN | LOCKED | (nama wali kelas) | Menunggu Pengumuman Discord | https://discord.gg/... |
| STUDENT | KHS001 | Ren Kurosawa | RenKurosawaRBLX | renkurosawa | 17 | ACTIVE | | | | | |
| STUDENT | KHS007 | Kenji Watanabe | KenjiWatanabeRBLX | kenjiwatanabe | 18 | SUSPENDED | | | | | |

Penting: **`status`** (kolom ke-7) selalu berarti status SISWA (ACTIVE/SUSPENDED/dst); **`classStatus`** selalu berarti status KELAS (LOCKED/RESTRICTED/OPEN). Jangan tertukar - keduanya sengaja dipisah jadi dua kolom berbeda supaya tidak bentrok dalam satu tab.

### 3. Struktur kolom tab lainnya

| Tab | Kolom |
|---|---|
| `SpecialClassrooms` | `id, name, status, discordUrl` |
| `Teachers` | `id, name, subject, role` |
| `Announcements` | `id, title, category, date, content` |
| `Facilities` | `id, name, icon, category, description, status` |
| `Media` | `logo, loginBg1, loginBg2, loginBg3, loginBg4, loginBg5, loginBg6` |

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
- `icon` Facilities pakai salah satu key: `swords`, `utensils`, `store`, `circle-dot`, `volleyball`, `book-open`, `landmark`, `building-2`.
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
