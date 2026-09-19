"use client";

import { Landmark, Target, MessageSquare, ClipboardList, ExternalLink, ShieldAlert } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import {
  aboutSchool,
  discordChannelGuide,
  registrationSteps,
  systemRules,
  DISCORD_SERVER_URL,
} from "@/data/school-info";

export default function SchoolInformationPage() {
  return (
    <AppShell title="School Information">
      <PageHeader
        eyebrow="OFFICIAL PROFILE"
        title="SCHOOL INFORMATION"
        icon={<Landmark className="h-5 w-5" />}
      />

      <div className="glass-card mb-6 rounded-2xl p-6 shadow-red-glow-sm sm:p-8">
        <h2 className="mb-4 font-display text-2xl tracking-[0.05em] text-kishin-white">
          {aboutSchool.title}
        </h2>
        <p className="text-sm leading-relaxed text-kishin-gray">{aboutSchool.description}</p>
      </div>

      <div className="glass-card mb-6 rounded-2xl p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-kishin-red" />
          <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">OBJECTIVE</h2>
        </div>
        <ul className="flex flex-col gap-3">
          {aboutSchool.objectives.map((obj, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-kishin-gray">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-kishin-red" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-kishin-red" />
            <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">
              DISCORD GUIDE
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {discordChannelGuide.map((c) =>
              c.url ? (
                <a
                  key={c.channel}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-kishin-line/8 bg-kishin-inset/30 px-4 py-3 transition hover:border-kishin-red/40 hover:bg-kishin-inset/50"
                >
                  <p className="flex items-center gap-1.5 font-mono text-sm font-semibold text-kishin-redlight">
                    {c.channel}
                    <ExternalLink className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-kishin-gray">{c.description}</p>
                </a>
              ) : (
                <div
                  key={c.channel}
                  className="rounded-lg border border-kishin-line/8 bg-kishin-inset/30 px-4 py-3"
                >
                  <p className="font-mono text-sm font-semibold text-kishin-redlight">
                    {c.channel}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-kishin-gray">{c.description}</p>
                </div>
              )
            )}
          </div>
          <a
            href={DISCORD_SERVER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-kishin-redlight hover:underline"
          >
            BUKA SERVER DISCORD <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-kishin-red" />
            <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">
              KETENTUAN PENDAFTARAN
            </h2>
          </div>
          <ol className="flex flex-col gap-3">
            {registrationSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-kishin-gray">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kishin-red/15 text-xs font-bold text-kishin-red">
                  {i + 1}
                </span>
                <span className="pt-0.5">
                  {step.text}
                  {step.url && (
                    <a
                      href={step.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1.5 inline-flex items-center gap-1 text-kishin-redlight hover:underline"
                    >
                      buka channel <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="glass-card mt-6 rounded-2xl border border-kishin-red/20 p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-kishin-red" />
          <h2 className="font-display text-xl tracking-[0.08em] text-kishin-white">
            KISHIN HIGH SCHOOL SYSTEM
          </h2>
        </div>
        <ol className="flex flex-col gap-3">
          {systemRules.map((rule, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-kishin-gray">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kishin-red/15 text-xs font-bold text-kishin-red">
                {i + 1}
              </span>
              <span className="pt-0.5">{rule}</span>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}
