"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
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
    // Returning users with a session skip the welcome screen entirely.
    if (booting || isLoading || !student) return;
    router.replace("/dashboard");
  }, [booting, isLoading, student, router]);

  const showWelcome = !booting && !isLoading && !student;

  return (
    <main className="relative min-h-screen w-full bg-kishin-black">
      <AnimatePresence mode="wait">
        {booting ? (
          <LoadingScreen key="loading" />
        ) : showWelcome ? (
          <WelcomeScreen key="welcome" />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
