import { Megaphone, CalendarDays } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { getAnnouncements } from "@/data/announcements.server";

export default async function AnnouncementsPage() {
  const { data: announcements } = await getAnnouncements();

  return (
    <AppShell title="Announcements" feature="announcements">
      <PageHeader
        eyebrow="MADING SEKOLAH"
        title="ANNOUNCEMENTS"
        description="Seluruh pengumuman resmi dari pihak Kishin High School."
        icon={<Megaphone className="h-5 w-5" />}
      />

      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="glass-card rounded-2xl p-6 transition hover:border-kishin-red/30"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full border border-kishin-red/40 bg-kishin-red/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-kishin-redlight">
                {a.category}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-kishin-gray">
                <CalendarDays className="h-3.5 w-3.5" />
                {a.date}
              </span>
            </div>
            <h3 className="mb-2 font-display text-xl tracking-[0.04em] text-kishin-white">
              {a.title}
            </h3>
            <p className="text-sm leading-relaxed text-kishin-gray">{a.content}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
