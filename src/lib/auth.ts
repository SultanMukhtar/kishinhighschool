import { Student, findStudent } from "@/data/students";
import { Teacher, findTeacher } from "@/data/teachers";

const SESSION_KEY = "kishin_session";

export type PortalRole = "STUDENT" | "TEACHER" | "COACH";

/**
 * One shared session shape for both students and staff, so the dashboard,
 * sidebar, profile, etc. can render off a single object. `status` doubles as
 * the badge text: a StudentStatus for students, or a composed label like
 * "WALI KELAS - CLASS A" / "COACH - FIGHTING MECHANICS" for staff.
 */
export interface AuthUser {
  role: PortalRole;
  id: string;
  icName: string;
  robloxUsername: string;
  discordUsername: string;
  class: string;
  age: number;
  status: string;
  subject?: string;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  message: string;
}

function studentToAuthUser(student: Student): AuthUser {
  return { role: "STUDENT", ...student };
}

function teacherToAuthUser(teacher: Teacher): AuthUser {
  const roleLabel =
    teacher.class && teacher.class.length > 0
      ? `WALI KELAS - ${teacher.class}`
      : `${teacher.role === "COACH" ? "COACH" : "GURU"} - ${teacher.subject}`;

  return {
    role: teacher.role,
    id: teacher.id,
    icName: teacher.icName,
    robloxUsername: teacher.robloxUsername,
    discordUsername: teacher.discordUsername,
    class: teacher.class || "SEMUA KELAS",
    age: teacher.age,
    status: roleLabel,
    subject: teacher.subject,
  };
}

export function attemptStudentLogin(
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

  const user = studentToAuthUser(student);
  persistSession(user);

  return {
    success: true,
    user,
    message: "Welcome to Kishin High School.",
  };
}

export function attemptTeacherLogin(
  teachers: Teacher[],
  icName: string,
  robloxUsername: string,
  age: number
): LoginResult {
  if (!icName.trim() || !robloxUsername.trim() || !age) {
    return {
      success: false,
      message: "Seluruh kolom wajib diisi dengan lengkap.",
    };
  }

  const teacher = findTeacher(teachers, icName, robloxUsername, age);

  if (!teacher) {
    return {
      success: false,
      message:
        "Staff identity tidak ditemukan. Silakan periksa kembali Nama IC, Roblox Username dan Umur IC.",
    };
  }

  if (teacher.status === "INACTIVE") {
    return {
      success: false,
      message: "Akun staff ini sedang dinonaktifkan. Hubungi pihak management melalui Discord.",
    };
  }

  const user = teacherToAuthUser(teacher);
  persistSession(user);

  return {
    success: true,
    user,
    message: "Welcome back to Kishin High School.",
  };
}

function persistSession(user: AuthUser): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
