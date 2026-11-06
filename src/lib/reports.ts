/**
 * Data management layer for RoadSafe.
 *
 * All report read/write operations go through this module.
 * Components must never access localStorage directly.
 *
 * Storage backend: browser localStorage (demo only).
 * In a real application this would be replaced with API calls.
 */

import {
  ReportStatus,
  type Report,
  type ReportFilters,
  type ReportFormData,
  type ReportStats,
} from "@/types";
import {
  DEMO_USER_ID,
  STORAGE_KEY_REPORTS,
  STORAGE_KEY_VERSION,
  STORAGE_DATA_VERSION,
  VALID_STATUS_TRANSITIONS,
} from "@/lib/constants";
import { SEED_REPORTS } from "@/lib/seed-data";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns true when running in a browser context.
 * The data layer is called from Client Components but we guard anyway.
 */
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Read and parse the reports array from localStorage.
 * Returns the seed data if:
 *   - localStorage is unavailable
 *   - the stored data is missing or unparseable
 *   - the stored data version doesn't match the current version
 */
function readFromStorage(): Report[] {
  if (!isBrowser()) return [...SEED_REPORTS];

  try {
    const version = localStorage.getItem(STORAGE_KEY_VERSION);
    if (version !== STORAGE_DATA_VERSION) {
      // First visit or incompatible version — seed the store
      writeToStorage(SEED_REPORTS);
      return [...SEED_REPORTS];
    }

    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    if (!raw) {
      writeToStorage(SEED_REPORTS);
      return [...SEED_REPORTS];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      writeToStorage(SEED_REPORTS);
      return [...SEED_REPORTS];
    }

    return parsed as Report[];
  } catch {
    // JSON parse error or localStorage access denied
    return [...SEED_REPORTS];
  }
}

/**
 * Persist the reports array to localStorage.
 * Silently ignores errors (e.g. private browsing quota exceeded).
 */
function writeToStorage(reports: Report[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY_VERSION, STORAGE_DATA_VERSION);
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  } catch {
    // Storage quota exceeded or access denied — continue without persisting
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Retrieve all reports from storage.
 * Initialises with seed data on the first call.
 */
export function getReports(): Report[] {
  return readFromStorage();
}

/**
 * Retrieve a single report by ID.
 * Returns undefined if the report does not exist.
 */
export function getReportById(id: string): Report | undefined {
  return readFromStorage().find((r) => r.id === id);
}

/**
 * Retrieve only the reports submitted by the demo user.
 */
export function getMyReports(): Report[] {
  return readFromStorage().filter((r) => r.submittedBy === DEMO_USER_ID);
}

/**
 * Save a new report built from form data.
 * Assigns a unique ID, sets status to PENDING, and records the submission time.
 *
 * Returns the newly created Report.
 */
export function saveReport(formData: ReportFormData): Report {
  const reports = readFromStorage();

  const newReport: Report = {
    id: crypto.randomUUID(),
    title: formData.title,
    description: formData.description,
    location: formData.location,
    category: formData.category,
    severity: formData.severity,
    status: ReportStatus.PENDING,
    submittedAt: new Date().toISOString(),
    submittedBy: DEMO_USER_ID,
    // Convert File to a data URL if provided — stored as base64 for localStorage demo
    imageUrl: undefined,
  };

  // Image handling: if a File was provided, the caller is responsible for
  // converting it to a data URL before passing here, or we store undefined.
  // See useReports hook for the async conversion helper.
  if (formData.imageFile === undefined) {
    // No image — leave imageUrl undefined
  }

  const updated = [newReport, ...reports];
  writeToStorage(updated);
  return newReport;
}

/**
 * Save a new report that already has an imageUrl (base64 data URL).
 * Use this variant when the calling code has already converted the File.
 */
export function saveReportWithImage(
  formData: ReportFormData,
  imageUrl: string | undefined
): Report {
  const reports = readFromStorage();

  const newReport: Report = {
    id: crypto.randomUUID(),
    title: formData.title,
    description: formData.description,
    location: formData.location,
    category: formData.category,
    severity: formData.severity,
    status: ReportStatus.PENDING,
    submittedAt: new Date().toISOString(),
    submittedBy: DEMO_USER_ID,
    imageUrl,
  };

  const updated = [newReport, ...reports];
  writeToStorage(updated);
  return newReport;
}

/**
 * Update the status of an existing report.
 *
 * Validates the transition is allowed before applying it.
 * Returns the updated Report, or undefined if the report was not found
 * or the transition is invalid.
 */
export function updateReportStatus(
  id: string,
  newStatus: Report["status"],
  adminNote?: string
): Report | undefined {
  const reports = readFromStorage();
  const index = reports.findIndex((r) => r.id === id);

  if (index === -1) return undefined;

  const report = reports[index];
  const allowed = VALID_STATUS_TRANSITIONS[report.status];

  if (!allowed.includes(newStatus)) {
    console.warn(
      `[RoadSafe] Invalid status transition: ${report.status} → ${newStatus}`
    );
    return undefined;
  }

  const updated: Report = {
    ...report,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    adminNote: adminNote ?? report.adminNote,
  };

  const updatedReports = [...reports];
  updatedReports[index] = updated;
  writeToStorage(updatedReports);
  return updated;
}

/**
 * Force-update a report's status without transition validation.
 * Use only in contexts where the caller has already validated the transition
 * (e.g. the admin dashboard confirming with the user before applying).
 */
export function forceUpdateReportStatus(
  id: string,
  newStatus: Report["status"],
  adminNote?: string
): Report | undefined {
  const reports = readFromStorage();
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) return undefined;

  const updated: Report = {
    ...reports[index],
    status: newStatus,
    updatedAt: new Date().toISOString(),
    adminNote: adminNote ?? reports[index].adminNote,
  };

  const updatedReports = [...reports];
  updatedReports[index] = updated;
  writeToStorage(updatedReports);
  return updated;
}

/**
 * Calculate summary statistics across all stored reports.
 */
export function getReportStats(): ReportStats {
  const reports = readFromStorage();
  return {
    total: reports.length,
    pending: reports.filter((r) => r.status === ReportStatus.PENDING).length,
    verified: reports.filter((r) => r.status === ReportStatus.VERIFIED).length,
    inProgress: reports.filter((r) => r.status === ReportStatus.IN_PROGRESS).length,
    resolved: reports.filter((r) => r.status === ReportStatus.RESOLVED).length,
    rejected: reports.filter((r) => r.status === ReportStatus.REJECTED).length,
  };
}

/**
 * Apply filters to a reports array and return the matching subset.
 * Separating filtering logic here keeps components free of business logic.
 */
export function filterReports(reports: Report[], filters: ReportFilters): Report[] {
  return reports.filter((report) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(report.category)
    ) {
      return false;
    }

    // Severity filter
    if (
      filters.severities.length > 0 &&
      !filters.severities.includes(report.severity)
    ) {
      return false;
    }

    // Status filter
    if (
      filters.statuses.length > 0 &&
      !filters.statuses.includes(report.status)
    ) {
      return false;
    }

    // Verified-only filter — hide PENDING and REJECTED reports
    if (
      filters.verifiedOnly &&
      (report.status === ReportStatus.PENDING ||
        report.status === ReportStatus.REJECTED)
    ) {
      return false;
    }

    // Search query — match against title, description, and address
    if (filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase();
      const haystack = [
        report.title,
        report.description,
        report.location.address ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

/**
 * Build a default (no-filter) ReportFilters object.
 */
export function defaultFilters(): ReportFilters {
  return {
    categories: [],
    severities: [],
    statuses: [],
    verifiedOnly: false,
    searchQuery: "",
  };
}

/**
 * Reset all stored data back to the seed reports.
 * Useful for demo resets.
 */
export function resetToSeedData(): Report[] {
  writeToStorage(SEED_REPORTS);
  return [...SEED_REPORTS];
}
