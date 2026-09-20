import { Users } from "lucide-react";
import { SchoolClass } from "@/data/classes";

interface ClassCrewSectionProps {
  classes: SchoolClass[];
}

/** Accent color for each class's "CLASS X" label, in CLASS_TAB_ORDER order. */
const CREW_ACCENTS = [
  "text-kishin-red",
  "text-kishin-gold",
  "text-purple-600 dark:text-purple-400",
  "text-blue-600 dark:text-blue-400",
  "text-slate-600 dark:text-slate-400",
];

export default function ClassCrewSection({ classes }: ClassCrewSectionProps) {
  const crew = classes
    .map((c, i) => ({ class: c, accent: CREW_ACCENTS[i] ?? "text-kishin-red" }))
    .filter(({ class: c }) => c.crewLore);

  if (crew.length === 0) return null;

  return (
    <div className="mb-10">
      <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-red">CLASS CREW</p>
      <h2 className="font-display text-2xl tracking-[0.05em] text-kishin-white">
        Temukan kru kelasmu
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-kishin-gray">
        Setiap kelas punya gaya, spesialisasi, dan ikatan yang berbeda. Setiap kelas memiliki
        kehormatannya sendiri.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {crew.map(({ class: c, accent }) => (
          <div key={c.id} className="glass-card flex flex-col overflow-hidden rounded-2xl">
            <div className="aspect-square w-full overflow-hidden bg-kishin-inset/60">
              {c.crewPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.crewPhotoUrl} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Users className="h-9 w-9 text-kishin-gray/40" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className={`text-xs font-bold tracking-[0.15em] ${accent}`}>{c.name}</p>
              <h3 className="mt-1 font-display text-lg tracking-[0.03em] text-kishin-white">
                {c.crewNickname}
              </h3>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-kishin-gray">{c.crewLore}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
