"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import { useAuth } from "@/context/AuthContext";

const BOOT_DURATION_MS = 1100;

export default function HomePage() {
  const [booting, setBooting] = useState(true);
  const { student, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Warm up both destinations immediately so the redirect below is instant
    // once booting ends - no blank flash while the target route loads.
    router.prefetch("/login");
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), BOOT_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (booting || isLoading) return;
    router.replace(student ? "/dashboard" : "/login");
  }, [booting, isLoading, student, router]);

  return (
    <main className="relative min-h-screen w-full bg-kishin-black">
      <AnimatePresence>{booting && <LoadingScreen key="loading" />}</AnimatePresence>
    </main>
  );
}
