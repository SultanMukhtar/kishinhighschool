"use client";

import { useRouter } from "next/navigation";
import { Settings, LogOut, Info } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { student, logout } = useAuth();
  const router = useRouter();

  if (!student) return <AppShell>{null}</AppShell>;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <AppShell title="Settings">
      <PageHeader
        eyebrow="ACCOUNT & SESSION"
        title="SETTINGS"
        description="Kelola sesi login dan data lokal yang tersimpan pada perangkat ini."
        icon={<Settings className="h-5 w-5" />}
      />

      <div className="flex flex-col gap-5">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="mb-4 font-display text-lg tracking-[0.08em] text-kishin-white">
            SESSION INFORMATION
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                STUDENT ID
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{student.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                IC NAME
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{student.icName}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                CLASS
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{student.class}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                SESSION STORAGE
              </p>
              <p className="mt-1 font-semibold text-kishin-white">LocalStorage (Browser)</p>
            </div>
          </div>
        </div>

        <div className="glass-card flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p className="text-xs leading-relaxed text-amber-200/80">
            Website ini tidak menggunakan database server. Seluruh sesi dan data pengaturan hanya
            tersimpan pada LocalStorage perangkat/browser ini dan tidak tersinkronisasi ke server
            manapun.
          </p>
        </div>

        <div className="glass-card flex flex-col gap-3 rounded-2xl border border-kishin-red/25 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-kishin-white">Logout dari Sistem</h3>
            <p className="mt-1 text-xs text-kishin-gray">
              Mengakhiri sesi login dan menghapus data identitas dari perangkat ini.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-lg bg-kishin-red px-4 py-2.5 text-xs font-bold tracking-[0.15em] text-white transition hover:bg-kishin-redlight"
          >
            <LogOut className="h-4 w-4" />
            LOGOUT
          </button>
        </div>
      </div>
    </AppShell>
  );
}
