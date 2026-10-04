"use client";

import { motion } from "framer-motion";
import { Hourglass, ShieldAlert, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import KishinLogo from "@/components/KishinLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface PendingApprovalScreenProps {
  icName: string;
  rejected: boolean;
}

export default function PendingApprovalScreen({ icName, rejected }: PendingApprovalScreenProps) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-kishin-black px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(200,30,44,0.1),transparent_65%)]" />
      <ThemeToggle className="fixed right-4 top-4 z-20" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel relative w-full max-w-md rounded-2xl p-8 text-center shadow-red-glow sm:p-10"
      >
        <div className="flex flex-col items-center">
          <KishinLogo size={56} className="mb-4 shadow-red-glow-sm" />
          {rejected ? (
            <>
              <ShieldAlert className="mb-3 h-10 w-10 text-kishin-red" />
              <h1 className="font-display text-2xl tracking-[0.06em] text-kishin-white">
                PENDAFTARAN DITOLAK
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-kishin-gray">
                Pendaftaran <span className="font-semibold text-kishin-white">{icName}</span>{" "}
                belum bisa disetujui. Hubungi pihak sekolah melalui Discord untuk informasi lebih
                lanjut.
              </p>
            </>
          ) : (
            <>
              <Hourglass className="mb-3 h-10 w-10 text-kishin-red" />
              <h1 className="font-display text-2xl tracking-[0.06em] text-kishin-white">
                MENUNGGU PERSETUJUAN
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-kishin-gray">
                Pendaftaran <span className="font-semibold text-kishin-white">{icName}</span>{" "}
                sudah diterima dan sedang menunggu persetujuan dari pihak sekolah. Halaman ini
                akan otomatis bisa diakses setelah disetujui.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-kishin-red/30 bg-kishin-red/5 px-3.5 py-2.5 text-sm font-semibold tracking-wide text-kishin-redlight transition hover:bg-kishin-red/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </motion.div>
    </main>
  );
}
