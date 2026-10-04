"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronDown, AlertTriangle } from "lucide-react";
import KishinLogo from "@/components/KishinLogo";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import ThemeToggle from "@/components/ThemeToggle";

interface OnboardingFormProps {
  classes: { id: string; name: string }[];
}

export default function OnboardingForm({ classes }: OnboardingFormProps) {
  const router = useRouter();
  const [icName, setIcName] = useState("");
  const [classId, setClassId] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ icName, classId, age: Number(age) }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Gagal menyimpan data. Coba lagi.");
        setIsSubmitting(false);
        return;
      }

      router.push("/pending-approval");
      router.refresh();
    } catch {
      setError("Gagal menghubungi server. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full">
      <BackgroundSlideshow />
      <ThemeToggle className="fixed right-4 top-4 z-20" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-panel relative w-full max-w-md rounded-2xl p-8 shadow-red-glow sm:p-10"
        >
          <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 divider-line" />

          <div className="flex flex-col items-center">
            <KishinLogo size={64} className="mb-4 shadow-red-glow-sm" />
            <h1 className="font-display text-center text-2xl tracking-[0.1em] text-kishin-white sm:text-3xl">
              LENGKAPI IDENTITAS
            </h1>
            <p className="mt-2 text-center text-[11px] font-semibold tracking-[0.3em] text-kishin-red">
              SATU LANGKAH LAGI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
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

            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-[0.15em] text-kishin-gray">
                CLASS
              </label>
              <div className="relative">
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  required
                  className="w-full appearance-none rounded-lg border border-kishin-line/10 bg-kishin-inset/40 px-4 py-3 text-sm text-kishin-white outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
                >
                  <option value="" disabled className="text-black">
                    Pilih Class
                  </option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id} className="text-black">
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-kishin-gray" />
              </div>
            </div>

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
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2 overflow-hidden rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-4 py-3 text-kishin-redlight"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-xs leading-relaxed text-kishin-redlight/90">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-kishin-red px-4 py-3.5 text-sm font-bold tracking-[0.15em] text-white transition hover:bg-kishin-redlight disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShieldCheck className="h-4 w-4" />
              {isSubmitting ? "MENYIMPAN..." : "LANJUTKAN"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </main>
  );
}
