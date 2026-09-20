import { StudentStatus } from "@/data/students";

/**
 * Sidebar/page keys that can be locked per student status. Deliberately
 * excludes Dashboard, Student Profile, School Information, School Rules,
 * Curriculum, Facilities and Settings - those stay open for every status.
 */
export type FeatureKey = "coaching-clinic" | "classes" | "announcements" | "report";

/**
 * Which features are locked for each student status. Edit this map to
 * change access rules - it's the single source of truth used by both the
 * sidebar (visual lock icon) and the page itself (actual access gate).
 */
const LOCKED_BY_STATUS: Record<StudentStatus, FeatureKey[]> = {
  ACTIVE: [],
  INACTIVE: ["coaching-clinic", "classes", "report"],
  SUSPENDED: ["coaching-clinic", "classes", "announcements", "report"],
  GRADUATED: ["coaching-clinic", "classes", "report"],
};

export function getLockedFeatures(status: string): FeatureKey[] {
  return LOCKED_BY_STATUS[status as StudentStatus] ?? [];
}

export function isFeatureLocked(status: string, feature: FeatureKey): boolean {
  return getLockedFeatures(status).includes(feature);
}
