/**
 * GOOGLE SHEETS DATA SOURCE CONFIGURATION
 * =========================================
 * Kishin High School dikelola lewat satu Google Sheet dengan beberapa tab.
 * Ganti setiap URL placeholder di bawah dengan link "Publish to web" (CSV)
 * dari tab yang sesuai. Lihat README.md bagian "Setup Google Sheets" untuk
 * langkah lengkap membuat sheet dan mendapatkan link-nya.
 *
 * Setiap Class (A-E, International) punya tab-nya sendiri-sendiri, dan tab
 * itu berisi DUA hal sekaligus (dibedakan lewat kolom `rowType`):
 *   - satu baris CLASS_INFO  -> info kelas (description, waliKelas, dst)
 *   - beberapa baris STUDENT -> daftar siswa di kelas itu (dengan status siswa)
 * Tidak ada tab "Students" terpisah lagi - semua siswa hidup di tab kelasnya
 * masing-masing supaya wali kelas cukup kelola satu tab miliknya.
 *
 * Selama sebuah tab belum dikonfigurasi (masih placeholder), website akan
 * otomatis memakai data demo bawaan (fallback) di src/data/*.ts - situs
 * tetap berjalan normal tanpa perlu setup dulu.
 */

export type SheetTab =
  | "classA"
  | "classB"
  | "classC"
  | "classD"
  | "classE"
  | "classInternational"
  | "specialClassrooms"
  | "teachers"
  | "announcements"
  | "facilities"
  | "media";

const PLACEHOLDER = "PASTE_PUBLISHED_CSV_LINK_HERE";

export const SHEET_CSV_URLS: Record<SheetTab, string> = {
  classA:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1590093497&single=true&output=csv",
  classB:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1710819978&single=true&output=csv",
  classC:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=274334887&single=true&output=csv",
  classD:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=2056553727&single=true&output=csv",
  classE:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1546785422&single=true&output=csv",
  classInternational:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1624107404&single=true&output=csv",
  specialClassrooms:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1767731359&single=true&output=csv",
  teachers:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=415863703&single=true&output=csv",
  announcements:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=142301150&single=true&output=csv",
  facilities:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=487067856&single=true&output=csv",
  media:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=671201318&single=true&output=csv",
};

/** Seberapa lama (detik) data sheet di-cache sebelum diambil ulang. */
export const SHEET_REVALIDATE_SECONDS = 60;

export function isTabConfigured(tab: SheetTab): boolean {
  const url = SHEET_CSV_URLS[tab];
  return typeof url === "string" && url.startsWith("http");
}
