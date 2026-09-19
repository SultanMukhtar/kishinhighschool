import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, getAdminSessionToken } from "@/lib/adminAuth";
import { getStudents } from "@/data/students.server";
import { getClasses, getSpecialClassrooms } from "@/data/classes.server";
import { getTeachers } from "@/data/teachers.server";
import { getAnnouncements } from "@/data/announcements.server";
import { getFacilities } from "@/data/facilities.server";
import { getMedia } from "@/data/media.server";
import AdminPanelClient from "@/components/admin/AdminPanelClient";
import AdminAccessGate from "@/components/admin/AdminAccessGate";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === getAdminSessionToken();

  if (!authorized) {
    return <AdminAccessGate />;
  }

  const [students, classes, specialClassrooms, teachers, announcements, facilities, media] =
    await Promise.all([
      getStudents(),
      getClasses(),
      getSpecialClassrooms(),
      getTeachers(),
      getAnnouncements(),
      getFacilities(),
      getMedia(),
    ]);

  return (
    <AdminPanelClient
      students={students}
      classes={classes}
      specialClassrooms={specialClassrooms}
      teachers={teachers}
      announcements={announcements}
      facilities={facilities}
      media={media}
    />
  );
}
