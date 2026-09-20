"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronDown, AlertTriangle, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";
import { classOptions } from "@/data/classes";
import { fallbackStudents, Student } from "@/data/students";
import { fallbackTeachers, Teacher } from "@/data/teachers";
import { attemptStudentLogin, attemptTeacherLogin } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import KishinLogo from "@/components/KishinLogo";

type Portal = "student" | "staff";

type FeedbackState =
  | { type: "idle" }
  | { type: "success"; message: string; name: string }
  | { type: "error"; message: string };

export default function LoginForm() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [portal, setPortal] = useState<Portal>("student");
  const [icName, setIcName] = useState("");
  const [className, setClassName] = useState("");
  const [robloxUsername, setRobloxUsername] = useState("");
  const [age, setAge] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>({ type: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchPortal = (next: Portal) => {
    setPortal(next);
    setFeedback({ type: "idle" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "idle" });

    const result =
      portal === "student"
        ? await handleStudentSubmit()
        : await handleStaffSubmit();

    if (result.success && result.user) {
      setFeedback({ type: "success", message: result.message, name: result.user.icName });
      refresh();
      setTimeout(() => {
        router.push("/dashboard");
      }, 1100);
    } else {
      setFeedback({ type: "error", message: result.message });
      setIsSubmitting(false);
    }
  };

  const handleStudentSubmit = async () => {
    let students: Student[] = fallbackStudents;
    try {
      const res = await fetch("/api/roster", { cache: "no-store" });
      const json = await res.json();
      if (Array.isArray(json.students) && json.students.length > 0) {
        students = json.students;
      }
    } catch {
      // network error - fall back to the demo roster above
    }
    return attemptStudentLogin(students, icName, className, Number(age));
  };

  const handleStaffSubmit = async () => {
    let teachers: Teacher[] = fallbackTeachers;
    try {
      const res = await fetch("/api/teacher-roster", { cache: "no-store" });
      const json = await res.json();
      if (Array.isArray(json.teachers) && json.teachers.length > 0) {
        teachers = json.teachers;
      }
    } catch {
      // network error - fall back to the demo staff list above
    }
    return attemptTeacherLogin(teachers, icName, robloxUsername, Number(age));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-panel relative w-full max-w-md rounded-2xl p-8 shadow-red-glow sm:p-10"
    >
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 divider-line" />

      <div className="flex flex-col items-center">
        <KishinLogo size={64} className="mb-4 shadow-red-glow-sm" />
        <h1 className="font-display text-center text-3xl tracking-[0.15em] text-kishin-white sm:text-4xl">
          KISHIN HIGH SCHOOL
        </h1>
        <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.3em] text-kishin-red">
          {portal === "student" ? "STUDENT IDENTITY VERIFICATION" : "STAFF IDENTITY VERIFICATION"}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg border border-kishin-line/10 bg-kishin-inset/30 p-1">
        <button
          type="button"
          onClick={() => switchPortal("student")}
          className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold tracking-[0.12em] transition ${
            portal === "student"
              ? "bg-kishin-red text-white shadow-red-glow-sm"
              : "text-kishin-gray hover:text-kishin-white"
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          SISWA
        </button>
        <button
          type="button"
          onClick={() => switchPortal("staff")}
          className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold tracking-[0.12em] transition ${
            portal === "staff"
              ? "bg-kishin-red text-white shadow-red-glow-sm"
              : "text-kishin-gray hover:text-kishin-white"
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          GURU / COACH
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.15em] text-kishin-gray">
            NAMA IN CHARACTER (IC)
          </label>
          <input
            type="text"
            value={icName}
            onChange={(e) => setIcName(e.target.value)}
            placeholder="Masukkan nama IC"
            required
            className="w-full rounded-lg border border-kishin-line/10 bg-kishin-inset/40 px-4 py-3 text-sm text-kishin-white placeholder:text-kishin-white/30 outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
          />
        </div>

        {portal === "student" ? (
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.15em] text-kishin-gray">
              CLASS
            </label>
            <div className="relative">
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="w-full appearance-none rounded-lg border border-kishin-line/10 bg-kishin-inset/40 px-4 py-3 text-sm text-kishin-white outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
              >
                <option value="" disabled className="text-black">
                  Pilih Class
                </option>
                {classOptions.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kishin-gray" />
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1.5 block text-xs font-semibold tracking-[0.15em] text-kishin-gray">
              ROBLOX USERNAME
            </label>
            <input
              type="text"
              value={robloxUsername}
              onChange={(e) => setRobloxUsername(e.target.value)}
              placeholder="Masukkan Roblox username"
              required
              className="w-full rounded-lg border border-kishin-line/10 bg-kishin-inset/40 px-4 py-3 text-sm text-kishin-white placeholder:text-kishin-white/30 outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
            />
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-[0.15em] text-kishin-gray">
            UMUR (IC)
          </label>
          <input
            type="number"
            min={1}
            max={99}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Masukkan umur IC"
            required
            className="w-full rounded-lg border border-kishin-line/10 bg-kishin-inset/40 px-4 py-3 text-sm text-kishin-white placeholder:text-kishin-white/30 outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
          />
        </div>

        <AnimatePresence mode="wait">
          {feedback.type === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-700 dark:text-emerald-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="text-xs leading-relaxed">
                <p className="font-semibold tracking-wide">IDENTITY VERIFIED</p>
                <p className="mt-0.5 text-emerald-700/80 dark:text-emerald-200/80">
                  Welcome to Kishin High School, {feedback.name}.
                </p>
              </div>
            </motion.div>
          )}
          {feedback.type === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 overflow-hidden rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-4 py-3 text-kishin-redlight"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="text-xs leading-relaxed">
                <p className="font-semibold tracking-wide">IDENTITY VERIFICATION FAILED</p>
                <p className="mt-0.5 text-kishin-redlight/90">{feedback.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-kishin-red px-4 py-3.5 text-sm font-bold tracking-[0.15em] text-white transition hover:bg-kishin-redlight disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ShieldCheck className="h-4 w-4" />
          {isSubmitting
            ? "VERIFYING..."
            : portal === "student"
              ? "VERIFY STUDENT IDENTITY"
              : "VERIFY STAFF IDENTITY"}
        </button>
      </form>
    </motion.div>
  );
}
