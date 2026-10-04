"use client";

import { ScrollText } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import { AccordionItem } from "@/components/ui/Accordion";
import { rules } from "@/data/rules";

export default function RulesPage() {
  return (
    <AppShell title="School Rules">
      <PageHeader
        eyebrow="CODE OF CONDUCT"
        title="SCHOOL RULES"
        description="Seluruh siswa/siswi wajib membaca dan mematuhi peraturan berikut selama berada di dalam server Kishin High School."
        icon={<ScrollText className="h-5 w-5" />}
      />

      <div className="flex flex-col gap-3">
        {rules.map((section, i) => (
          <AccordionItem key={section.id} title={section.title} index={i} defaultOpen={i === 0}>
            <ul className="flex flex-col gap-2.5">
              {section.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-kishin-gray">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kishin-red" />
                  {point}
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </div>
    </AppShell>
  );
}
