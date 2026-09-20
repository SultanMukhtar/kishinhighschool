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
  | "media"
  | "staff"
  | "whitelistJobs"
  | "extracurriculars";

export const SHEET_CSV_URLS: Record<SheetTab, string> = {
  classA:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=889376678&single=true&output=csv",
  classB:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1864864172&single=true&output=csv",
  classC:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1554643009&single=true&output=csv",
  classD:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=2089419120&single=true&output=csv",
  classE:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=998236903&single=true&output=csv",
  classInternational:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=848784900&single=true&output=csv",
  specialClassrooms:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=99288051&single=true&output=csv",
  teachers:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=2082896047&single=true&output=csv",
  announcements:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=2047382339&single=true&output=csv",
  facilities:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1885327168&single=true&output=csv",
  media:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1011940383&single=true&output=csv",
  staff:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1931358583&single=true&output=csv",
  whitelistJobs:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=1864147331&single=true&output=csv",
  extracurriculars:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSI54o6njZhFbfxIACxe0xDdQgMe766uH_xT1WlLstAMkKfPwHzI9Qmatcz240-Uk611wa8JugyKxfK/pub?gid=225290689&single=true&output=csv",
};

/** Seberapa lama (detik) data sheet di-cache sebelum diambil ulang. */
export const SHEET_REVALIDATE_SECONDS = 60;

export function isTabConfigured(tab: SheetTab): boolean {
  const url = SHEET_CSV_URLS[tab];
  return typeof url === "string" && url.startsWith("http");
}
