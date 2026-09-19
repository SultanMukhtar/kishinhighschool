import { GraduationCap } from "lucide-react";
import AppShell from "@/components/dashboard/AppShell";
import PageHeader from "@/components/ui/PageHeader";
import ClassGrid from "@/components/classes/ClassGrid";
import { getClasses, getSpecialClassrooms } from "@/data/classes.server";

export default async function ClassesPage() {
  const [{ data: classes }, { data: specialClassrooms }] = await Promise.all([
    getClasses(),
    getSpecialClassrooms(),
  ]);

  return (
    <AppShell title="Class Directory" feature="classes">
      <PageHeader
        eyebrow="ACADEMIC DIVISION"
        title="CLASS DIRECTORY"
        description="Seluruh ruang kelas Kishin High School saat ini berada dalam masa persiapan angkatan."
        icon={<GraduationCap className="h-5 w-5" />}
      />

      <ClassGrid classes={classes} specialClassrooms={specialClassrooms} />
    </AppShell>
  );
}
