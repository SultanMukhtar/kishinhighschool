"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import LoginForm from "@/components/LoginForm";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [isLoading, user, router]);

  return (
    <main className="relative min-h-screen w-full">
      <BackgroundSlideshow dimmed={theme === "dark"} />
      <ThemeToggle className="fixed right-4 top-4 z-20" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16"
      >
        <LoginForm />
      </motion.div>
    </main>
  );
}
