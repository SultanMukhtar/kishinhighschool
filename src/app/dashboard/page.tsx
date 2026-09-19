"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IdCard,
  GraduationCap,
  Calendar,
  ShieldCheck,
  Megaphone,
  ScrollText,
  Swords,
  Landmark,
  Lock,
  ExternalLink,
  User,
} from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import {
  Announcement,
  fallbackAnnouncements,
  mapAnnouncementRow,
  sortAnnouncementsByDateDesc,
} from "@/data/announcements";
import { SchoolClass } from "@/data/classes";
import { fetchTabRows } from "@/lib/clientSheet";
import { FeatureKey, getLockedFeatures } from "@/lib/permissions";

const quickLinks: { href: string; label: string; icon: React.ElementType; feature?: FeatureKey }[] = [
  { href: "/school-information", label: "School Information", icon: Landmark },
  { href: "/rules", label: "School Rules", icon: ScrollText },
  { href: "/coaching-clinic", label: "Coaching Clinic", icon: Swords, feature: "coaching-clinic" },
  { href: "/announcements", label: "Announcements", icon: Megaphone, feature: "announcements" },
];

export default function DashboardPage() {
  const { student } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(fallbackAnnouncements);
  const [ownClass, setOwnClass] = useState<SchoolClass | null>(null);
  const [classLoading, setClassLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchTabRows("announcements").then((rows) => {
      if (cancelled) return;
      const mapped = rows.map(mapAnnouncementRow).filter((a): a is Announcement => a !== null);
      if (mapped.length > 0) {
        setAnnouncements(sortAnnouncementsByDateDesc(mapped));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!student) return;
    let cancelled = false;
    fetch("/api/classes", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const classes: SchoolClass[] = Array.isArray(json?.data) ? json.data : [];
        const match = classes.find(
          (c) => c.name.trim().toUpperCase() === student.class.trim().toUpperCase()
        );
        setOwnClass(match ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setClassLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [student]);

  if (!student) return <AppShell>{null}</AppShell>;

  const lockedFeatures = getLockedFeatures(student.status);

  return (
    <AppShell title="Dashboard">
      <div className="mb-8">
        <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-red">
          SELAMAT DATANG DI KISHIN HIGH SCHOOL
        </p>
        <h1 className="font-display text-3xl tracking-[0.06em] text-kishin-white sm:text-4xl">
          Welcome, {student.icName}
        </h1>
        <p className="mt-2 text-sm text-kishin-gray">
          Portal pengelolaan sekolah virtual untuk server Gakuran Roleplay.
        </p>
      </div>

      {lockedFeatures.length > 0 && (
        <div className="glass-card mb-8 flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-xs leading-relaxed text-amber-200/80">
            Status keanggotaan Anda saat ini adalah{" "}
            <span className="font-bold text-amber-200">{student.status}</span>, sehingga beberapa
            fitur (ditandai ikon gembok di sidebar) sedang tidak dapat diakses.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-red-glow-sm lg:col-span-2">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-kishin-red/10 blur-3xl" />
          <div className="mb-5 flex items-center gap-2">
            <IdCard className="h-5 w-5 text-kishin-red" />
            <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">
              STUDENT IDENTITY
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoRow label="Nama IC" value={student.icName} />
            <InfoRow label="Class" value={student.class} />
            <InfoRow label="Umur" value={`${student.age} Tahun`} />
            <InfoRow label="Student ID" value={student.id} />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
            <span className="text-xs tracking-[0.2em] text-kishin-gray">STATUS</span>
            <StatusBadge status={student.status} />
          </div>
        </div>

        <div className="glass-card flex flex-col rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-kishin-red" />
            <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">
              SCHOOL SYSTEM
            </h2>
          </div>
          <ul className="flex flex-1 flex-col gap-3 text-xs leading-relaxed text-kishin-gray">
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-kishin-red" />
              Primetime RP: <span className="font-semibold text-kishin-white">19:00 - 02:00 WIB</span>
            </li>
            <li className="flex gap-2">
              <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-kishin-red" />
              Curriculum dimulai pukul <span className="font-semibold text-kishin-white">20:00 WIB</span>
            </li>
            <li className="flex gap-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-kishin-red" />
              User wajib mematikan nametag selama roleplay berlangsung.
            </li>
          </ul>
          <Link
            href="/rules"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-4 py-2.5 text-xs font-bold tracking-[0.15em] text-kishin-redlight transition hover:bg-kishin-red/20"
          >
            LIHAT SCHOOL RULES
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 font-display text-xl tracking-[0.08em] text-kishin-white">
          KELAS SAYA
        </h2>
        {classLoading ? (
          <div className="glass-card h-40 animate-pulse rounded-2xl" />
        ) : ownClass ? (
          <div className="glass-card relative overflow-hidden rounded-2xl border border-kishin-red/25 p-6 shadow-red-glow-sm sm:p-7">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-kishin-red/10 blur-3xl" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
                  {ownClass.name}
                </h3>
                <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-kishin-gray">
                  {ownClass.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
                  <span className="flex items-center gap-1.5 text-kishin-gray">
                    <User className="h-3.5 w-3.5" />
                    Wali Kelas:{" "}
                    <span className="font-semibold text-kishin-white">{ownClass.waliKelas}</span>
                  </span>
                  <StatusBadge status={student.status} />
                </div>
              </div>
              <a
                href={ownClass.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-4 py-2.5 text-xs font-bold tracking-[0.15em] text-kishin-redlight transition hover:bg-kishin-red/20"
              >
                OPEN DISCORD KELAS <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 text-sm text-kishin-gray">
            Data kelas tidak ditemukan untuk <span className="font-semibold text-kishin-white">{student.class}</span>.
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-xl tracking-[0.08em] text-kishin-white">
            LATEST ANNOUNCEMENTS
          </h2>
          {lockedFeatures.includes("announcements") ? (
            <div className="glass-card flex items-center gap-3 rounded-xl p-5 text-xs text-kishin-gray">
              <Lock className="h-4 w-4 shrink-0 text-kishin-gray/60" />
              Pengumuman tidak dapat diakses untuk status keanggotaan Anda saat ini.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {announcements.slice(0, 2).map((a) => (
                  <div key={a.id} className="glass-card rounded-xl p-5">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-kishin-red">
                        {a.category}
                      </span>
                      <span className="text-[10px] text-kishin-gray">{a.date}</span>
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-kishin-white">{a.title}</h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-kishin-gray">
                      {a.content}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/announcements"
                className="mt-4 inline-block text-xs font-semibold tracking-[0.1em] text-kishin-redlight hover:underline"
              >
                LIHAT SEMUA PENGUMUMAN →
              </Link>
            </>
          )}
        </div>

        <div>
          <h2 className="mb-4 font-display text-xl tracking-[0.08em] text-kishin-white">
            QUICK ACCESS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const locked = link.feature ? lockedFeatures.includes(link.feature) : false;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`glass-card relative flex flex-col items-center gap-2 rounded-xl p-4 text-center transition ${
                    locked ? "opacity-50" : "hover:border-kishin-red/40 hover:shadow-red-glow-sm"
                  }`}
                >
                  {locked && (
                    <Lock className="absolute right-2 top-2 h-3 w-3 text-kishin-gray/60" />
                  )}
                  <Icon className="h-5 w-5 text-kishin-red" />
                  <span className="text-[11px] font-medium leading-tight text-kishin-white">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-kishin-gray">{label}</p>
      <p className="mt-1 text-base font-semibold text-kishin-white">{value}</p>
    </div>
  );
}
