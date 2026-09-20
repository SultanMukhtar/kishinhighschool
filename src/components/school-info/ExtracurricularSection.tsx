"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Swords,
  Music,
  Puzzle,
  Palette,
  Trees,
  HeartPulse,
  Languages,
  BookOpenText,
  CircleDot,
} from "lucide-react";
import {
  Extracurricular,
  fallbackExtracurriculars,
  mapExtracurricularRow,
} from "@/data/extracurriculars";
import { fetchTabRows } from "@/lib/clientSheet";

const ICON_MAP: Record<string, React.ElementType> = {
  swords: Swords,
  music: Music,
  puzzle: Puzzle,
  palette: Palette,
  trees: Trees,
  "heart-pulse": HeartPulse,
  languages: Languages,
  "book-open-text": BookOpenText,
  "circle-dot": CircleDot,
  sparkles: Sparkles,
};

export default function ExtracurricularSection() {
  const [items, setItems] = useState<Extracurricular[]>(fallbackExtracurriculars);

  useEffect(() => {
    let cancelled = false;
    fetchTabRows("extracurriculars").then((rows) => {
      if (cancelled) return;
      const mapped = rows.map(mapExtracurricularRow).filter((e): e is Extracurricular => e !== null);
      if (mapped.length > 0) {
        setItems(mapped);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-10">
      <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-red">
        EKSTRAKURIKULER
      </p>
      <h2 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
        Ruang untuk berkembang di luar kelas
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-kishin-gray">
        Pilih kegiatan yang sesuai dengan minat dan bakatmu di Kishin High School.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? Sparkles;
          return (
            <div
              key={item.id}
              className="glass-card group relative overflow-hidden rounded-2xl transition hover:border-kishin-red/40 hover:shadow-red-glow-sm"
            >
              {item.photoUrl ? (
                <div className="relative">
                  <div className="aspect-video w-full overflow-hidden bg-kishin-inset/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-kishin-red/40 bg-kishin-black/60 text-kishin-red backdrop-blur-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
              ) : (
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-kishin-red/10 blur-2xl transition group-hover:bg-kishin-red/20" />
              )}
              <div className="p-5">
                {!item.photoUrl && (
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
                    <Icon className="h-5 w-5" />
                  </div>
                )}
                <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-kishin-gray">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
