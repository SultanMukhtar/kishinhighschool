import { Student, findStudent } from "@/data/students";

const SESSION_KEY = "kishin_session";

export interface LoginResult {
  success: boolean;
  student?: Student;
  message: string;
}

export function attemptLogin(
  students: Student[],
  icName: string,
  className: string,
  age: number
): LoginResult {
  if (!icName.trim() || !className || !age) {
    return {
      success: false,
      message: "Seluruh kolom wajib diisi dengan lengkap.",
    };
  }

  const student = findStudent(students, icName, className, age);

  if (!student) {
    return {
      success: false,
      message:
        "Student identity tidak ditemukan. Silakan periksa kembali Nama IC, Class dan Umur IC.",
    };
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(student));
  }

  return {
    success: true,
    student,
    message: "Welcome to Kishin High School.",
  };
}

export function getSession(): Student | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Student;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
