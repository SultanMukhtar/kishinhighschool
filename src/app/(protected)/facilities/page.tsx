import {
  Building2,
  Swords,
  Utensils,
  Store,
  CircleDot,
  BookOpen,
  Landmark,
  Coffee,
  Skull,
  Mic2,
  Dumbbell,
} from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import { getFacilities } from "@/data/facilities.server";

const iconMap: Record<string, React.ElementType> = {
  swords: Swords,
  utensils: Utensils,
  store: Store,
  "circle-dot": CircleDot,
  volleyball: CircleDot,
  "book-open": BookOpen,
  landmark: Landmark,
  "building-2": Building2,
  coffee: Coffee,
  skull: Skull,
  mic: Mic2,
  dumbbell: Dumbbell,
};

export default async function FacilitiesPage() {
  const { data: facilities } = await getFacilities();

  return (
    <AppShell title="Facilities">
      <PageHeader
        eyebrow="SCHOOL GROUNDS"
        title="FACILITIES"
        description="Fasilitas resmi yang tersedia di lingkungan Kishin High School."
        icon={<Building2 className="h-5 w-5" />}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f) => {
          const Icon = iconMap[f.icon] ?? Building2;
          return (
            <div
              key={f.id}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition hover:border-kishin-red/40 hover:shadow-red-glow-sm"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-kishin-red/10 blur-2xl transition group-hover:bg-kishin-red/20" />
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
                  <Icon className="h-6 w-6" />
                </div>
                <StatusBadge status={f.status} />
              </div>
              <h3 className="font-display text-xl tracking-[0.04em] text-kishin-white">
                {f.name}
              </h3>
              <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-kishin-red">
                {f.category}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-kishin-gray">{f.description}</p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
