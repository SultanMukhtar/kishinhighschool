import Papa from "papaparse";
import { SHEET_CSV_URLS, SHEET_REVALIDATE_SECONDS, SheetTab, isTabConfigured } from "./sheetsConfig";

export type SheetRow = Record<string, string>;

export type SheetSource = "sheet" | "fallback" | "mixed";

export interface SheetResult<T> {
  data: T[];
  source: SheetSource;
  error?: string;
}

/**
 * Fetches and parses a published Google Sheet tab as CSV rows.
 * Server-side only (uses Next.js fetch caching) - call from Server
 * Components, Route Handlers, or other server code, never directly
 * from a "use client" component.
 */
export async function fetchSheetRows(tab: SheetTab): Promise<SheetRow[]> {
  if (!isTabConfigured(tab)) {
    return [];
  }

  try {
    const res = await fetch(SHEET_CSV_URLS[tab], {
      next: { revalidate: SHEET_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      return [];
    }

    const csvText = await res.text();
    const parsed = Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      transform: (v) => v.trim(),
    });

    return parsed.data.filter((row) => Object.values(row).some((v) => v && v.length > 0));
  } catch {
    return [];
  }
}

/**
 * Combines live sheet rows (mapped to T) with a static fallback list.
 * Falls back automatically when the sheet isn't configured, is empty,
 * or fails to load - the site never breaks because of a spreadsheet typo.
 */
export function mergeWithFallback<T>(liveRows: T[], fallback: T[]): SheetResult<T> {
  if (liveRows.length > 0) {
    return { data: liveRows, source: "sheet" };
  }
  return { data: fallback, source: "fallback" };
}

/** Rolls up several per-item sources (e.g. one per tab) into one overall status. */
export function combineSources(sources: SheetSource[]): SheetSource {
  if (sources.every((s) => s === "sheet")) return "sheet";
  if (sources.every((s) => s === "fallback")) return "fallback";
  return "mixed";
}

export interface SplitClassRows {
  /** The one row with rowType=CLASS_INFO, if present. */
  infoRow?: SheetRow;
  /** All rows with rowType=STUDENT. */
  studentRows: SheetRow[];
}

const normalizeRowType = (v?: string) => v?.trim().toUpperCase();

/**
 * A class tab holds two kinds of rows at once, told apart by `rowType`:
 * one CLASS_INFO row (class description/wali kelas/etc) and any number of
 * STUDENT rows (that class's roster). Rows with any other/blank rowType are
 * ignored rather than guessed at, so a typo can't silently corrupt either list.
 */
export function splitClassTabRows(rows: SheetRow[]): SplitClassRows {
  const infoRow = rows.find((r) => normalizeRowType(r.rowType) === "CLASS_INFO");
  const studentRows = rows.filter((r) => normalizeRowType(r.rowType) === "STUDENT");
  return { infoRow, studentRows };
}
