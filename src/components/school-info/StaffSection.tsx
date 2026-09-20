"use client";

import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { fallbackStaff, groupStaff, mapStaffRow, StaffMember } from "@/data/staff";
import { fetchTabRows } from "@/lib/clientSheet";

function StaffPhoto({ member, className }: { member: StaffMember; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-kishin-inset/60 ${className ?? ""}`}>
      {member.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <UserRound className="h-10 w-10 text-kishin-gray/40" />
        </div>
      )}
    </div>
  );
}

function LeadershipCard({ member, badge }: { member: StaffMember; badge: string }) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="relative">
        <StaffPhoto member={member} className="aspect-[4/3] w-full" />
        <span className="absolute left-4 top-4 rounded-full bg-kishin-red px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-white shadow-red-glow-sm">
          {badge}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl tracking-[0.05em] text-kishin-white">{member.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-kishin-gray">{member.description}</p>
      </div>
    </div>
  );
}

function SenseiCard({ member }: { member: StaffMember }) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <StaffPhoto member={member} className="aspect-[3/4] w-full" />
      <div className="p-4">
        <h3 className="font-display text-base tracking-[0.03em] text-kishin-white">
          Sensei {member.name}
        </h3>
        <p className="mt-0.5 text-xs font-bold tracking-[0.08em] text-kishin-redlight">
          {member.roleLabel}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-kishin-gray">{member.description}</p>
      </div>
    </div>
  );
}

export default function StaffSection() {
  const [staff, setStaff] = useState<StaffMember[]>(fallbackStaff);

  useEffect(() => {
    let cancelled = false;
    fetchTabRows("staff").then((rows) => {
      if (cancelled) return;
      const mapped = rows.map(mapStaffRow).filter((s): s is StaffMember => s !== null);
      if (mapped.length > 0) {
        setStaff(mapped);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const { kaichou, senseiGroup, senseiList } = groupStaff(staff);

  return (
    <>
      {(kaichou || senseiGroup) && (
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-gold">
            KAICHOU (BOSS / KEPALA SEKOLAH)
          </p>
          <h2 className="mb-5 font-display text-2xl tracking-[0.05em] text-kishin-white">
            Figur yang mengarahkan Kishin
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {kaichou && <LeadershipCard member={kaichou} badge="KAICHOU" />}
            {senseiGroup && <LeadershipCard member={senseiGroup} badge="SENSEI" />}
          </div>
        </div>
      )}

      {senseiList.length > 0 && (
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-red">
            PROFIL SENSEI
          </p>
          <h2 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
            Para pembimbing di balik Kishin
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-kishin-gray">
            Kenali {senseiList.length} figur yang membentuk arah, keberanian, dan karakter para
            murid Kishin High School.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {senseiList.map((s) => (
              <SenseiCard key={s.id} member={s} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
