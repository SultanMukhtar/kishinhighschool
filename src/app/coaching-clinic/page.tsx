"use client";

import { Swords, Smartphone, Monitor, Dumbbell, Brain, Trophy } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { coaches, coachingMaterials } from "@/data/curriculum";

const materialIcons: Record<string, React.ElementType> = {
  "Fighting Mechanics": Swords,
  "Mobile Mechanics": Smartphone,
  "PC Mechanics": Monitor,
  "Fighting Practice": Dumbbell,
  Mentality: Brain,
  "Tournament Preparation": Trophy,
};

export default function CoachingClinicPage() {
  return (
    <AppShell title="Coaching Clinic" feature="coaching-clinic">
      <PageHeader
        eyebrow="COMBAT TRAINING PROGRAM"
        title="COACHING CLINIC"
        description="Program pelatihan combat dan fighting mechanics bersama coach berpengalaman Kishin High School."
        icon={<Swords className="h-5 w-5" />}
      />

      <h2 className="mb-4 font-display text-xl tracking-[0.08em] text-kishin-white">COACHES</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="glass-card flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition hover:border-kishin-red/40 hover:shadow-red-glow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-kishin-red/50 bg-kishin-inset/50 text-kishin-red">
              <Swords className="h-6 w-6" />
            </div>
            <p className="font-display text-lg tracking-[0.04em] text-kishin-white">
              {coach.name}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-display text-xl tracking-[0.08em] text-kishin-white">
        MATERI PELATIHAN
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coachingMaterials.map((material) => {
          const Icon = materialIcons[material] ?? Swords;
          return (
            <div
              key={material}
              className="glass-card flex items-center gap-4 rounded-xl p-5 transition hover:border-kishin-red/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-kishin-red/10 text-kishin-red">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold tracking-wide text-kishin-white">{material}</p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
