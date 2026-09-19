import "server-only";
import { fetchSheetRows, mergeWithFallback, SheetResult } from "@/lib/sheets";
import {
  Announcement,
  fallbackAnnouncements,
  mapAnnouncementRow,
  sortAnnouncementsByDateDesc,
} from "./announcements";

export async function getAnnouncements(): Promise<SheetResult<Announcement>> {
  const rows = await fetchSheetRows("announcements");
  const mapped = rows.map(mapAnnouncementRow).filter((a): a is Announcement => a !== null);
  const result = mergeWithFallback(mapped, fallbackAnnouncements);
  return { ...result, data: sortAnnouncementsByDateDesc(result.data) };
}
