"use client";

import { IdCard, Gamepad2, MessageCircle, GraduationCap, Cake, Fingerprint } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import KishinLogo from "@/components/KishinLogo";

export default function ProfilePage() {
  const { student } = useAuth();
  if (!student) return <AppShell>{null}</AppShell>;

  const fields = [
    { label: "IC Name", value: student.icName, icon: IdCard },
    { label: "Roblox Username", value: student.robloxUsername, icon: Gamepad2 },
    { label: "Discord Username", value: student.discordUsername, icon: MessageCircle },
    { label: "Class", value: student.class, icon: GraduationCap },
    { label: "IC Age", value: `${student.age} Tahun`, icon: Cake },
    { label: "Student ID", value: student.id, icon: Fingerprint },
  ];

  return (
    <AppShell title="Student Profile">
      <PageHeader
        eyebrow="IDENTITY RECORD"
        title="STUDENT PROFILE"
        description="Data identitas resmi siswa/siswi yang terdaftar dalam sistem Kishin High School."
        icon={<IdCard className="h-5 w-5" />}
      />

      <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-red-glow-sm sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-kishin-red/10 blur-3xl" />

        <div className="mb-6 flex flex-col items-center gap-4 border-b border-white/8 pb-6 text-center sm:flex-row sm:text-left">
          <KishinLogo size={80} className="border-2 shadow-red-glow-sm" />
          <div>
            <h2 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
              {student.icName}
            </h2>
            <p className="text-xs tracking-[0.15em] text-kishin-gray">{student.id}</p>
            <div className="mt-2 flex justify-center gap-2 sm:justify-start">
              <StatusBadge status={student.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-black/30 px-4 py-3.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-kishin-red/10 text-kishin-red">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-kishin-gray">
                    {f.label.toUpperCase()}
                  </p>
                  <p className="truncate text-sm font-semibold text-kishin-white">{f.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
