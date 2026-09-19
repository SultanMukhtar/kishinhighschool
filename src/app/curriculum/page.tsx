"use client";

import {
  BookOpen,
  ChefHat,
  Palette,
  Clapperboard,
  HeartHandshake,
  PenTool,
  Music,
  Clock,
  Timer,
} from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { curriculumSubjects, curriculumSchedule } from "@/data/curriculum";

const iconMap: Record<string, React.ElementType> = {
  "chef-hat": ChefHat,
  palette: Palette,
  clapperboard: Clapperboard,
  "heart-handshake": HeartHandshake,
  "pen-tool": PenTool,
  music: Music,
};

export default function CurriculumPage() {
  return (
    <AppShell title="Curriculum">
      <PageHeader
        eyebrow="ACADEMIC PROGRAM"
        title="CURRICULUM"
        description="Mata pelajaran resmi yang diajarkan di Kishin High School beserta pengampu masing-masing."
        icon={<BookOpen className="h-5 w-5" />}
      />

      <div className="glass-card mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-kishin-red/25 p-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-kishin-red" />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-kishin-gray">
              JAM PEMBELAJARAN
            </p>
            <p className="font-display text-xl tracking-[0.05em] text-kishin-white">
              {curriculumSchedule.time}
            </p>
          </div>
        </div>
        <div className="hidden h-10 w-px bg-kishin-line/10 sm:block" />
        <div className="flex items-center gap-3">
          <Timer className="h-5 w-5 text-kishin-red" />
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-kishin-gray">DURASI</p>
            <p className="font-display text-xl tracking-[0.05em] text-kishin-white">
              {curriculumSchedule.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curriculumSubjects.map((subj) => {
          const Icon = iconMap[subj.icon] ?? BookOpen;
          return (
            <div
              key={subj.id}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition hover:border-kishin-red/40 hover:shadow-red-glow-sm"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-kishin-red/10 blur-2xl transition group-hover:bg-kishin-red/20" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl tracking-[0.04em] text-kishin-white">
                {subj.subject}
              </h3>
              <p className="mt-2 text-sm font-medium text-kishin-redlight">{subj.teacher}</p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
