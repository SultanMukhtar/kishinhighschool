"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Check, X, UserRound } from "lucide-react";
import KishinLogo from "@/components/KishinLogo";
import ThemeToggle from "@/components/ThemeToggle";

interface PendingAccount {
  id: string;
  name: string | null;
  image: string | null;
  createdAt: string | Date;
  studentProfile: {
    icName: string;
    age: number;
    class: { name: string };
  } | null;
}

interface AccountsQueueClientProps {
  pending: PendingAccount[];
}

export default function AccountsQueueClient({ pending: initialPending }: AccountsQueueClientProps) {
  const router = useRouter();
  const [pending, setPending] = useState(initialPending);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleDecision = async (id: string, decision: "approve" | "reject") => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/accounts/${id}/${decision}`, { method: "POST" });
      if (res.ok) {
        setPending((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-kishin-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(200,30,44,0.08),transparent_60%)]" />

      <header className="glass-panel sticky top-0 z-20 flex items-center gap-4 border-b border-kishin-line/8 px-4 py-4 sm:px-8">
        <KishinLogo size={36} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg tracking-[0.08em] text-kishin-white">
            PERSETUJUAN AKUN BARU
          </p>
          <p className="text-[10px] tracking-[0.2em] text-kishin-gray">SUPERADMIN</p>
        </div>
        <ThemeToggle />
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-lg border border-kishin-line/10 bg-kishin-inset/30 px-3.5 py-2 text-xs font-semibold text-kishin-gray transition hover:text-kishin-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        {pending.length === 0 ? (
          <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
            <ShieldCheck className="h-8 w-8 text-emerald-500" />
            <p className="text-sm text-kishin-gray">
              Tidak ada pendaftaran yang menunggu persetujuan saat ini.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {pending.map((p) => (
              <div
                key={p.id}
                className="glass-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-kishin-red/10 text-kishin-red">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.name ?? ""} className="h-full w-full object-cover" />
                    ) : (
                      <UserRound className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-kishin-white">
                      {p.studentProfile?.icName ?? "(belum lengkap)"}
                    </p>
                    <p className="truncate text-xs text-kishin-gray">
                      Discord: {p.name ?? "-"}
                      {p.studentProfile && (
                        <>
                          {" "}
                          &middot; {p.studentProfile.class.name} &middot; {p.studentProfile.age}{" "}
                          Tahun
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    disabled={busyId === p.id}
                    onClick={() => handleDecision(p.id, "reject")}
                    className="flex items-center gap-1.5 rounded-lg border border-kishin-red/40 bg-kishin-red/10 px-3.5 py-2 text-xs font-bold tracking-[0.1em] text-kishin-redlight transition hover:bg-kishin-red/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    TOLAK
                  </button>
                  <button
                    type="button"
                    disabled={busyId === p.id}
                    onClick={() => handleDecision(p.id, "approve")}
                    className="flex items-center gap-1.5 rounded-lg bg-kishin-red px-3.5 py-2 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-kishin-redlight disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    SETUJUI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
