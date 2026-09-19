"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BackgroundSlideshow from "@/components/BackgroundSlideshow";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { student, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && student) {
      router.replace("/dashboard");
    }
  }, [isLoading, student, router]);

  return (
    <main className="relative min-h-screen w-full">
      <BackgroundSlideshow />
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
