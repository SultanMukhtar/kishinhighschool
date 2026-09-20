"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { FeatureKey, isFeatureLocked } from "@/lib/permissions";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  /** When set, gates `children` behind the student's status permissions. */
  feature?: FeatureKey;
}

export default function AppShell({ children, title, feature }: AppShellProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-kishin-black">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-kishin-red/30 border-t-kishin-red" />
          <p className="text-xs tracking-[0.3em] text-kishin-gray">LOADING SESSION...</p>
        </div>
      </div>
    );
  }

  // Feature locks only ever apply to students - staff always have full access.
  const locked = feature && user.role === "STUDENT" ? isFeatureLocked(user.status, feature) : false;

  return (
    <div className="relative min-h-screen w-full bg-kishin-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(200,30,44,0.08),transparent_60%)]" />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="relative flex min-h-screen flex-col lg:pl-72">
        <Topbar user={user} onMenuClick={() => setMobileOpen(true)} title={title} />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10"
        >
          {locked ? <LockedFeatureNotice status={user.status} /> : children}
        </motion.main>
      </div>
    </div>
  );
}

function LockedFeatureNotice({ status }: { status: string }) {
  return (
    <div className="glass-card mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-kishin-red/30 p-10 text-center shadow-red-glow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
        <Lock className="h-7 w-7" />
      </div>
      <h2 className="font-display text-2xl tracking-[0.06em] text-kishin-white">FITUR DIKUNCI</h2>
      <p className="text-sm leading-relaxed text-kishin-gray">
        Fitur ini tidak dapat diakses karena status keanggotaan Anda saat ini adalah{" "}
        <span className="font-bold text-kishin-redlight">{status}</span>. Hubungi pihak sekolah
        melalui Discord apabila Anda merasa ini adalah kesalahan.
      </p>
      <Link
        href="/dashboard"
        className="mt-2 flex items-center gap-2 rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-kishin-redlight transition hover:bg-kishin-red/20"
      >
        <ArrowLeft className="h-4 w-4" />
        KEMBALI KE DASHBOARD
      </Link>
    </div>
  );
}
