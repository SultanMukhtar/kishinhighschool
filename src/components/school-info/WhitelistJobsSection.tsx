"use client";

import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import { fallbackWhitelistJobs, mapWhitelistJobRow, WhitelistJob } from "@/data/whitelistJobs";
import { fetchTabRows } from "@/lib/clientSheet";

const ACCENT_BUTTON_CLASSES: Record<WhitelistJob["accent"], string> = {
  red: "bg-kishin-red text-white hover:bg-kishin-redlight",
  gold: "bg-kishin-gold text-kishin-maroon hover:brightness-110",
  blue: "bg-blue-600 text-white hover:bg-blue-500",
  purple: "bg-purple-600 text-white hover:bg-purple-500",
  green: "bg-emerald-600 text-white hover:bg-emerald-500",
  gray: "bg-kishin-gray text-white hover:brightness-110",
};

function JobPhoto({ job }: { job: WhitelistJob }) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-kishin-inset/60">
      {job.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={job.photoUrl} alt={job.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Briefcase className="h-8 w-8 text-kishin-gray/40" />
        </div>
      )}
    </div>
  );
}

function JobCard({ job }: { job: WhitelistJob }) {
  return (
    <div className="glass-card flex flex-col overflow-hidden rounded-2xl">
      <JobPhoto job={job} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg tracking-[0.04em] text-kishin-white">{job.name}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-kishin-gray">{job.description}</p>
        <a
          href={job.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 flex items-center justify-center rounded-lg px-4 py-2.5 text-xs font-bold tracking-[0.1em] transition ${ACCENT_BUTTON_CLASSES[job.accent]}`}
        >
          {job.buttonLabel}
        </a>
      </div>
    </div>
  );
}

export default function WhitelistJobsSection() {
  const [jobs, setJobs] = useState<WhitelistJob[]>(fallbackWhitelistJobs);

  useEffect(() => {
    let cancelled = false;
    fetchTabRows("whitelistJobs").then((rows) => {
      if (cancelled) return;
      const mapped = rows.map(mapWhitelistJobRow).filter((j): j is WhitelistJob => j !== null);
      if (mapped.length > 0) {
        setJobs(mapped);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (jobs.length === 0) return null;

  return (
    <div className="mb-10">
      <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-gold">
        WHITELIST JOBS
      </p>
      <h2 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
        Peran yang menjaga Kishin tetap hidup
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-kishin-gray">
        Peran whitelist bantu membangun pengalaman sekolah yang lebih hidup.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
