"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Users,
  GraduationCap,
  BookUser,
  Megaphone,
  Building2,
  ArrowLeft,
  Eye,
  Database,
  HardDrive,
  Layers,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";
import { Student } from "@/data/students";
import { SpecialClassroom } from "@/data/classes";
import type { ClassesResult } from "@/data/classes.server";
import { Teacher } from "@/data/teachers";
import { Announcement } from "@/data/announcements";
import { Facility } from "@/data/facilities";
import type { MediaResult } from "@/data/media.server";
import { SheetResult, SheetSource } from "@/lib/sheets";
import StatusBadge from "@/components/ui/StatusBadge";
import KishinLogo from "@/components/KishinLogo";
import ThemeToggle from "@/components/ThemeToggle";

type Tab = "students" | "classes" | "teachers" | "announcements" | "facilities" | "media";

interface AdminPanelClientProps {
  students: SheetResult<Student>;
  classes: ClassesResult;
  specialClassrooms: SheetResult<SpecialClassroom>;
  teachers: SheetResult<Teacher>;
  announcements: SheetResult<Announcement>;
  facilities: SheetResult<Facility>;
  media: MediaResult;
}

const SOURCE_META: Record<SheetSource, { icon: React.ElementType; label: string; classes: string }> = {
  sheet: {
    icon: Database,
    label: "LIVE FROM GOOGLE SHEETS",
    classes: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  mixed: {
    icon: Layers,
    label: "SEBAGIAN DARI SHEETS, SEBAGIAN FALLBACK",
    classes: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  fallback: {
    icon: HardDrive,
    label: "DEMO / FALLBACK DATA",
    classes: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
};

function SourceBadge({ source, compact }: { source: SheetSource; compact?: boolean }) {
  const meta = SOURCE_META[source];
  const Icon = meta.icon;

  if (compact) {
    return (
      <span
        title={meta.label}
        className={`inline-flex shrink-0 items-center justify-center rounded-full border p-1 ${meta.classes}`}
      >
        <Icon className="h-3 w-3" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.15em] ${meta.classes}`}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

export default function AdminPanelClient({
  students: studentsResult,
  classes: classesResult,
  specialClassrooms: specialClassroomsResult,
  teachers: teachersResult,
  announcements: announcementsResult,
  facilities: facilitiesResult,
  media: mediaResult,
}: AdminPanelClientProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("students");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleAdminLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin-auth", { method: "DELETE" });
    } finally {
      router.refresh();
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; source: SheetSource }[] = [
    { id: "students", label: "Student List", icon: Users, source: studentsResult.source },
    { id: "classes", label: "Class List", icon: GraduationCap, source: classesResult.source },
    { id: "teachers", label: "Teacher List", icon: BookUser, source: teachersResult.source },
    {
      id: "announcements",
      label: "Announcement List",
      icon: Megaphone,
      source: announcementsResult.source,
    },
    { id: "facilities", label: "Facility List", icon: Building2, source: facilitiesResult.source },
    { id: "media", label: "Media", icon: ImageIcon, source: mediaResult.source },
  ];

  const activeTab = tabs.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-kishin-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(200,30,44,0.1),transparent_60%)]" />

      <header className="glass-panel sticky top-0 z-20 border-b border-kishin-line/8 px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KishinLogo size={40} />
            <div>
              <p className="font-display text-lg tracking-[0.08em] text-kishin-white">
                KISHIN HIGH SCHOOL
              </p>
              <p className="text-[10px] tracking-[0.25em] text-kishin-gray">MANAGEMENT PANEL</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-lg border border-kishin-line/10 px-3 py-2 text-xs font-semibold text-kishin-gray transition hover:border-kishin-red/40 hover:text-kishin-redlight"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">BACK TO DASHBOARD</span>
            </Link>
            <button
              onClick={handleAdminLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-lg border border-kishin-red/30 bg-kishin-red/5 px-3 py-2 text-xs font-semibold text-kishin-redlight transition hover:bg-kishin-red/20 disabled:opacity-60"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{loggingOut ? "..." : "LOGOUT ADMIN"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="mb-6 flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-kishin-red" />
          <h1 className="font-display text-3xl tracking-[0.06em] text-kishin-white">
            MANAGEMENT PANEL
          </h1>
        </div>

        <div className="glass-card mb-8 flex items-start gap-3 rounded-2xl border border-sky-500/25 bg-sky-500/5 p-5">
          <Eye className="mt-0.5 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300" />
          <p className="text-xs leading-relaxed text-sky-800/80 dark:text-sky-200/80">
            Panel ini bersifat <span className="font-bold">view-only</span> - data ditampilkan
            langsung dari Google Sheets yang dipublikasikan (auto-refresh setiap kunjungan) dan
            tidak ada kontrol untuk mengubah apa pun di sini. Untuk mengubah data (termasuk status
            siswa), edit langsung di Google Sheets.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold tracking-[0.1em] transition ${
                    active
                      ? "bg-kishin-red text-white shadow-red-glow-sm"
                      : "glass-card text-kishin-gray hover:text-kishin-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
          <SourceBadge source={activeTab.source} />
        </div>

        {tab === "students" && (
          <div className="glass-card overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-kishin-line/8 text-[10px] tracking-[0.15em] text-kishin-gray">
                  <th className="px-5 py-4">STUDENT ID</th>
                  <th className="px-5 py-4">IC NAME</th>
                  <th className="px-5 py-4">ROBLOX</th>
                  <th className="px-5 py-4">DISCORD</th>
                  <th className="px-5 py-4">CLASS</th>
                  <th className="px-5 py-4">AGE</th>
                  <th className="px-5 py-4">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {studentsResult.data.map((s) => (
                  <tr key={s.id} className="border-b border-kishin-line/5 last:border-0">
                    <td className="px-5 py-4 font-mono text-xs text-kishin-gray">{s.id}</td>
                    <td className="px-5 py-4 font-semibold text-kishin-white">{s.icName}</td>
                    <td className="px-5 py-4 text-kishin-gray">{s.robloxUsername}</td>
                    <td className="px-5 py-4 text-kishin-gray">{s.discordUsername}</td>
                    <td className="px-5 py-4 text-kishin-gray">{s.class}</td>
                    <td className="px-5 py-4 text-kishin-gray">{s.age}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "classes" && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {classesResult.data.map((c, i) => (
                <div key={c.id} className="glass-card rounded-xl p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">
                      {c.name}
                    </h3>
                    <SourceBadge source={classesResult.perClassSource[i]} compact />
                  </div>
                  <div className="mt-2">
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-kishin-gray">
                    Wali Kelas: {c.waliKelas}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mb-3 mt-6 text-xs font-bold tracking-[0.2em] text-kishin-gray">
              SPECIAL CLASSROOM
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specialClassroomsResult.data.map((s) => (
                <div key={s.id} className="glass-card rounded-xl p-5">
                  <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">
                    {s.name}
                  </h3>
                  <div className="mt-2">
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "teachers" && (
          <div className="glass-card overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-kishin-line/8 text-[10px] tracking-[0.15em] text-kishin-gray">
                  <th className="px-5 py-4">NAME</th>
                  <th className="px-5 py-4">SUBJECT / MATERI</th>
                  <th className="px-5 py-4">ROLE</th>
                </tr>
              </thead>
              <tbody>
                {teachersResult.data.map((t) => (
                  <tr key={t.id} className="border-b border-kishin-line/5 last:border-0">
                    <td className="px-5 py-4 font-semibold text-kishin-white">{t.name}</td>
                    <td className="px-5 py-4 text-kishin-gray">{t.subject}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={t.role} variant="neutral" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "announcements" && (
          <div className="flex flex-col gap-3">
            {announcementsResult.data.map((a) => (
              <div key={a.id} className="glass-card rounded-xl p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-kishin-red">
                    {a.category}
                  </span>
                  <span className="text-[10px] text-kishin-gray">{a.date}</span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-kishin-white">{a.title}</h3>
                <p className="text-xs leading-relaxed text-kishin-gray">{a.content}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "facilities" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesResult.data.map((f) => (
              <div key={f.id} className="glass-card rounded-xl p-5">
                <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">
                  {f.name}
                </h3>
                <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-kishin-red">
                  {f.category}
                </p>
                <div className="mt-2">
                  <StatusBadge status={f.status} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-kishin-gray">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "media" && (
          <div className="flex flex-col gap-6">
            <div className="glass-card flex flex-col items-center gap-4 rounded-xl p-6 sm:flex-row sm:items-start">
              <KishinLogo size={80} />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-kishin-white">Logo</h3>
                <p className="mt-1 break-all text-xs text-kishin-gray">
                  {mediaResult.data.logoUrl || "Belum diatur - memakai placeholder 刃"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-kishin-gray">
                LOGIN BACKGROUND SLIDESHOW
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, i) => mediaResult.data.loginBackgrounds[i] || "").map(
                  (url, i) => (
                    <div key={i} className="glass-card overflow-hidden rounded-xl">
                      <div className="flex aspect-video items-center justify-center bg-kishin-inset/40">
                        {url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={url} alt={`Login background ${i + 1}`} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-[10px] tracking-[0.15em] text-kishin-gray/60">
                            SLOT {i + 1} KOSONG
                          </span>
                        )}
                      </div>
                      <p className="truncate px-3 py-2 text-[10px] text-kishin-gray">
                        {url || "Belum diatur - memakai gradient placeholder"}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
