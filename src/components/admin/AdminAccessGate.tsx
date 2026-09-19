"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, KeyRound, AlertTriangle } from "lucide-react";
import KishinLogo from "@/components/KishinLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminAccessGate() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const json = await res.json();

      if (json.success) {
        router.refresh();
      } else {
        setError(json.message || "Kode akses salah.");
        setIsSubmitting(false);
      }
    } catch {
      setError("Gagal menghubungi server. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-kishin-black px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(200,30,44,0.1),transparent_65%)]" />
      <ThemeToggle className="fixed right-4 top-4 z-20" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel relative w-full max-w-sm rounded-2xl p-8 shadow-red-glow"
      >
        <div className="flex flex-col items-center">
          <KishinLogo size={56} className="mb-4 shadow-red-glow-sm" />
          <div className="mb-2 flex items-center gap-2 text-kishin-red">
            <ShieldAlert className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-[0.3em]">RESTRICTED AREA</span>
          </div>
          <h1 className="font-display text-2xl tracking-[0.08em] text-kishin-white">
            MANAGEMENT PANEL
          </h1>
          <p className="mt-1 text-center text-xs text-kishin-gray">
            Masukkan kode akses admin untuk melanjutkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-kishin-gray" />
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Kode akses"
              autoFocus
              required
              className="w-full rounded-lg border border-kishin-line/10 bg-kishin-inset/40 py-3 pl-10 pr-4 text-sm text-kishin-white placeholder:text-kishin-white/30 outline-none transition focus:border-kishin-red/70 focus:shadow-red-glow-sm"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2 overflow-hidden rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-3.5 py-2.5 text-xs text-kishin-redlight"
              >
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 rounded-lg bg-kishin-red px-4 py-3 text-sm font-bold tracking-[0.15em] text-white transition hover:bg-kishin-redlight disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "MEMERIKSA..." : "MASUK"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
