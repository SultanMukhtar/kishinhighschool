"use client";

import { Settings, LogOut, Info, Sun, Moon } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  if (!user) return <AppShell>{null}</AppShell>;

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
                {user.role === "USER" ? "STUDENT ID" : "STAFF ID"}
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{user.id}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                IC NAME
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{user.icName ?? "-"}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                CLASS
              </p>
              <p className="mt-1 font-semibold text-kishin-white">{user.class ?? "-"}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-kishin-gray">
                MASUK DENGAN
              </p>
              <p className="mt-1 font-semibold text-kishin-white">Discord</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="mb-4 font-display text-lg tracking-[0.08em] text-kishin-white">
            APPEARANCE
          </h2>
          <p className="mb-4 text-xs text-kishin-gray">
            Pilih tampilan situs sesuai preferensi Anda.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-bold tracking-[0.12em] transition ${
                theme === "dark"
                  ? "border-kishin-red/50 bg-kishin-red/10 text-kishin-red"
                  : "border-kishin-line/10 bg-kishin-inset/20 text-kishin-gray hover:border-kishin-line/20"
              }`}
            >
              <Moon className="h-4 w-4" />
              DARK MODE
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-bold tracking-[0.12em] transition ${
                theme === "light"
                  ? "border-kishin-red/50 bg-kishin-red/10 text-kishin-red"
                  : "border-kishin-line/10 bg-kishin-inset/20 text-kishin-gray hover:border-kishin-line/20"
              }`}
            >
              <Sun className="h-4 w-4" />
              LIGHT MODE
            </button>
          </div>
        </div>

        <div className="glass-card flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
          <p className="text-xs leading-relaxed text-amber-800/80 dark:text-amber-200/80">
            Sesi login kamu dikelola lewat akun Discord dan tersimpan secara aman di server -
            logout di satu perangkat tidak memengaruhi perangkat lain yang masih login.
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
            onClick={logout}
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
