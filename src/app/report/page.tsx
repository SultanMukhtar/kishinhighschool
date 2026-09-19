"use client";

import { AlertOctagon, MessageCircle, ExternalLink } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";

const REPORT_DISCORD_CHANNEL_URL =
  "https://discord.com/channels/1158678454896693248/1534323398119788574";

export default function ReportPage() {
  return (
    <AppShell title="Report Player" feature="report">
      <PageHeader
        eyebrow="SUPPORT & ENFORCEMENT"
        title="LAPOR PELANGGARAN PLAYER"
        description="Menemukan player yang melanggar aturan IC / Gakuran RP, punya kendala di Discord, atau ingin memberikan saran? Sampaikan melalui channel Report Discord."
        icon={<AlertOctagon className="h-5 w-5" />}
      />

      <div className="mx-auto max-w-md">
        <a
          href={REPORT_DISCORD_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl p-8 text-center transition hover:border-kishin-red/40 hover:shadow-red-glow-sm"
        >
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-kishin-red/10 blur-3xl transition group-hover:bg-kishin-red/20" />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h3 className="font-display text-xl tracking-[0.05em] text-kishin-white">
            REPORT DISCORD
          </h3>
          <p className="text-xs leading-relaxed text-kishin-gray">
            Untuk laporan pelanggaran player (IC / Gakuran RP maupun Discord) dan saran untuk
            Kishin High School - semuanya disampaikan lewat channel yang sama.
          </p>
          <span className="mt-2 flex items-center gap-2 rounded-lg bg-kishin-red px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-white transition group-hover:bg-kishin-redlight">
            💬 REPORT DISCORD <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </AppShell>
  );
}
