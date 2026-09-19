import type { SheetRow } from "@/lib/sheets";

/** Client-safe fetch of a sheet tab's raw rows via the same-origin API route. */
export async function fetchTabRows(tab: string): Promise<SheetRow[]> {
  try {
    const res = await fetch(`/api/sheet/${tab}`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.rows) ? json.rows : [];
  } catch {
    return [];
  }
}
