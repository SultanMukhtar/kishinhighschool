"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMedia } from "@/context/MediaContext";

/** Themed gradients used whenever a background slot has no URL configured yet. */
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #1a0a0a 0%, #3a0d0d 45%, #0a0a0a 100%)",
  "linear-gradient(135deg, #0a0a12 0%, #1a0a1a 50%, #050505 100%)",
  "linear-gradient(135deg, #0f0a0a 0%, #241010 50%, #0a0a0a 100%)",
  "linear-gradient(135deg, #120808 0%, #3a0d0d 40%, #000000 100%)",
  "linear-gradient(135deg, #060608 0%, #1a1015 50%, #08060a 100%)",
  "linear-gradient(135deg, #0a0a0a 0%, #2a1212 45%, #050505 100%)",
];

const SLIDE_DURATION = 6000;

export default function BackgroundSlideshow() {
  const { media } = useMedia();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const count = Math.max(media.loginBackgrounds.length, FALLBACK_GRADIENTS.length);
    return Array.from({ length: count }, (_, i) => ({
      url: media.loginBackgrounds[i] || "",
      gradient: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
    }));
  }, [media.loginBackgrounds]);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[index];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-kishin-black">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 animate-kenburns bg-cover bg-center"
            style={{
              backgroundImage: current.url
                ? `url(${current.url}), ${current.gradient}`
                : current.gradient,
            }}
            role="img"
            aria-label="Kishin High School background"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-kishin-red" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
