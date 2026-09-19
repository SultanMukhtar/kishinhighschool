"use client";

import { motion } from "framer-motion";
import KishinLogo from "@/components/KishinLogo";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-kishin-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,30,44,0.12),transparent_65%)]" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-6"
      >
        <div className="relative">
          <KishinLogo size={96} className="border-2 shadow-red-glow" />
          <motion.div
            className="absolute inset-0 rounded-full border border-kishin-red/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="text-center">
          <h1 className="font-display text-4xl tracking-[0.2em] text-kishin-white sm:text-5xl">
            KISHIN <span className="text-kishin-red text-glow">HIGH SCHOOL</span>
          </h1>
          <motion.p
            className="mt-3 font-body text-xs tracking-[0.35em] text-kishin-gray sm:text-sm"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            INITIALIZING SCHOOL SYSTEM...
          </motion.p>
        </div>

        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-kishin-red"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
