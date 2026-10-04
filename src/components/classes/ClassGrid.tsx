"use client";

import { Lock, ExternalLink, User, Star } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { SchoolClass, SpecialClassroom } from "@/data/classes";

interface ClassGridProps {
  classes: SchoolClass[];
  specialClassrooms: SpecialClassroom[];
}

export default function ClassGrid({ classes, specialClassrooms }: ClassGridProps) {
  const { user } = useAuth();
  const ownClassName = user?.class?.trim().toUpperCase();

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => {
          const isOwnClass = c.name.trim().toUpperCase() === ownClassName;
          return (
            <div
              key={c.id}
              className={`glass-card relative flex flex-col overflow-hidden rounded-2xl border p-6 ${
                isOwnClass
                  ? "border-kishin-red/70 shadow-red-glow-sm"
                  : "border-kishin-line/8"
              }`}
            >
              {isOwnClass && (
                <span className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg bg-kishin-red px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-white">
                  <Star className="h-3 w-3" />
                  KELAS ANDA
                </span>
              )}

              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="font-display text-2xl tracking-[0.04em] text-kishin-white">
                  {c.name}
                </h3>
                {!isOwnClass && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-kishin-red/10 text-kishin-red">
                    <Lock className="h-[18px] w-[18px]" />
                  </div>
                )}
              </div>

              <p className="mb-4 flex-1 text-xs font-semibold tracking-[0.08em] text-kishin-gray">
                {c.description}
              </p>

              <div className="mb-4 flex flex-col gap-2 border-t border-kishin-line/8 pt-4 text-xs">
                <Row label="STATUS">
                  <StatusBadge status={isOwnClass && user ? user.displayStatus ?? c.status : c.status} />
                </Row>
                <Row label="PENANGGUNG JAWAB">
                  <span className="flex items-center gap-1.5 text-kishin-white">
                    <User className="h-3.5 w-3.5 text-kishin-gray" />
                    {c.waliKelas}
                  </span>
                </Row>
                <Row label="AKSES">
                  <span className="text-kishin-white">{c.akses}</span>
                </Row>
              </div>

              <a
                href={c.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-4 py-2.5 text-xs font-bold tracking-[0.15em] text-kishin-redlight transition hover:bg-kishin-red/20"
              >
                OPEN DISCORD <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </div>

      <h2 className="mb-4 mt-10 font-display text-xl tracking-[0.08em] text-kishin-white">
        SPECIAL CLASSROOM
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialClassrooms.map((s) => (
          <div
            key={s.id}
            className="glass-card flex flex-col gap-3 rounded-xl border border-kishin-line/8 p-5"
          >
            <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">{s.name}</h3>
            <StatusBadge status={s.status} />
            <a
              href={s.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center gap-2 rounded-lg border border-kishin-line/10 bg-kishin-inset/30 px-3 py-2 text-[11px] font-bold tracking-[0.12em] text-kishin-gray transition hover:border-kishin-red/40 hover:text-kishin-redlight"
            >
              OPEN DISCORD <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] font-bold tracking-[0.15em] text-kishin-gray">{label}</span>
      {children}
    </div>
  );
}
