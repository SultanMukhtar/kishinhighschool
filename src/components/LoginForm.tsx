"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import KishinLogo from "@/components/KishinLogo";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDiscordLogin = () => {
    setIsSubmitting(true);
    signIn("discord", { callbackUrl: "/dashboard" });
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
          IDENTITY VERIFICATION
        </p>
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-kishin-gray">
        Masuk menggunakan akun Discord kamu. Setelah masuk pertama kali, kamu akan diminta
        melengkapi identitas (Nama IC, Class, Umur) lalu menunggu persetujuan dari pihak sekolah.
      </p>

      <button
        type="button"
        onClick={handleDiscordLogin}
        disabled={isSubmitting}
        className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-kishin-red px-4 py-3.5 text-sm font-bold tracking-[0.15em] text-white transition hover:bg-kishin-redlight disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShieldCheck className="h-4 w-4" />
        {isSubmitting ? "MENGHUBUNGKAN..." : "MASUK DENGAN DISCORD"}
      </button>
    </motion.div>
  );
}
