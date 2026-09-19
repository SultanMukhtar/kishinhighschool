"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import KishinLogo from "@/components/KishinLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full"
    >
      <BackgroundSlideshow blurred={false} dimmed={false} />
      <ThemeToggle className="fixed right-4 top-4 z-20" />

      <div
        className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 text-center [text-shadow:0_2px_16px_rgb(var(--kishin-black)/0.9)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <KishinLogo size={140} className="mx-auto border-2 shadow-red-glow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <p className="mt-6 text-[11px] font-bold tracking-[0.4em] text-kishin-red">
            GAKURAN ROLEPLAY
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-[0.1em] text-kishin-white sm:text-6xl">
            KISHIN <span className="text-kishin-red text-glow">HIGH SCHOOL</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-kishin-gray">
            Portal pengelolaan sekolah virtual untuk server Gakuran Roleplay. Masuk untuk
            mengakses dashboard, kelas, dan seluruh fasilitas sekolah.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          onClick={() => router.push("/login")}
          className="group mt-9 flex items-center gap-2.5 rounded-lg bg-kishin-red px-8 py-4 text-sm font-bold tracking-[0.2em] text-white shadow-red-glow-sm transition hover:bg-kishin-redlight hover:shadow-red-glow"
        >
          MASUK SEKOLAH
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.main>
  );
}
