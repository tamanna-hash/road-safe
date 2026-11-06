"use client";

/**
 * useReports — React hook for the RoadSafe data layer.
 *
 * Wraps src/lib/reports.ts so components get reactive state and
 * convenient action functions without touching localStorage directly.
 *
 * Usage:
 *   const { reports, stats, submitReport, updateStatus } = useReports();
 */

import { useState, useEffect, useCallback } from "react";
import type { Report, ReportFilters, ReportFormData, ReportStats, ReportStatus } from "@/types";
import {
  getReports,
  getMyReports,
  getReportStats,
  saveReportWithImage,
  updateReportStatus,
  forceUpdateReportStatus,
  filterReports,
  defaultFilters,
  resetToSeedData,
} from "@/lib/reports";

// ---------------------------------------------------------------------------
// Helper — convert a File to a base64 data URL
// ---------------------------------------------------------------------------

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

// ---------------------------------------------------------------------------
// Hook return type
// ---------------------------------------------------------------------------

export interface UseReportsReturn {
  /** All reports from storage */
  reports: Report[];
  /** Reports submitted by the demo user */
  myReports: Report[];
  /** Aggregate statistics */
  stats: ReportStats;
  /** True while the initial load from localStorage is happening */
  isLoading: boolean;

  /**
   * Submit a new report from form data.
   * Handles image conversion automatically.
   * Returns the newly created Report.
   */
  submitReport: (formData: ReportFormData) => Promise<Report>;

  /**
   * Update a report's status with transition validation.
   * Returns the updated Report, or undefined if the transition is invalid.
   */
  updateStatus: (
    id: string,
    newStatus: ReportStatus,
    adminNote?: string
  ) => Report | undefined;

  /**
   * Force-update a report's status (bypasses transition validation).
   * Use only in the admin dashboard after explicit user confirmation.
   */
  forceUpdateStatus: (
    id: string,
    newStatus: ReportStatus,
    adminNote?: string
  ) => Report | undefined;

  /**
   * Apply filters to the reports list.
   * Returns a filtered copy — does not mutate state.
   */
  applyFilters: (filters: ReportFilters) => Report[];

  /**
   * Get a single report by ID from the current state.
   */
  getById: (id: string) => Report | undefined;

  /**
   * Reset all data back to the seed reports (for demo resets).
   */
  reset: () => void;

  /** Re-read from localStorage and refresh state */
  refresh: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useReports(): UseReportsReturn {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---- Initial load --------------------------------------------------------

  useEffect(() => {
    setReports(getReports());
    setIsLoading(false);
  }, []);

  // ---- Derived state -------------------------------------------------------

  const myReports = reports.filter(
    (r) => r.submittedBy === "demo-user-001"
  );

  const stats: ReportStats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "PENDING").length,
    verified: reports.filter((r) => r.status === "VERIFIED").length,
    inProgress: reports.filter((r) => r.status === "IN_PROGRESS").length,
    resolved: reports.filter((r) => r.status === "RESOLVED").length,
    rejected: reports.filter((r) => r.status === "REJECTED").length,
  };

  // ---- Actions -------------------------------------------------------------

  const submitReport = useCallback(async (formData: ReportFormData): Promise<Report> => {
    let imageUrl: string | undefined;

    if (formData.imageFile) {
      try {
        imageUrl = await fileToDataUrl(formData.imageFile);
      } catch {
        // Image conversion failed — continue without image
        imageUrl = undefined;
      }
    }

    const newReport = saveReportWithImage(formData, imageUrl);
    // Refresh state after write
    setReports(getReports());
    return newReport;
  }, []);

  const updateStatus = useCallback(
    (id: string, newStatus: ReportStatus, adminNote?: string): Report | undefined => {
      const updated = updateReportStatus(id, newStatus, adminNote);
      if (updated) setReports(getReports());
      return updated;
    },
    []
  );

  const forceUpdateStatus = useCallback(
    (id: string, newStatus: ReportStatus, adminNote?: string): Report | undefined => {
      const updated = forceUpdateReportStatus(id, newStatus, adminNote);
      if (updated) setReports(getReports());
      return updated;
    },
    []
  );

  const applyFilters = useCallback(
    (filters: ReportFilters): Report[] => filterReports(reports, filters),
    [reports]
  );

  const getById = useCallback(
    (id: string): Report | undefined => reports.find((r) => r.id === id),
    [reports]
  );

  const reset = useCallback(() => {
    setReports(resetToSeedData());
  }, []);

  const refresh = useCallback(() => {
    setReports(getReports());
  }, []);

  return {
    reports,
    myReports,
    stats,
    isLoading,
    submitReport,
    updateStatus,
    forceUpdateStatus,
    applyFilters,
    getById,
    reset,
    refresh,
  };
}

// ---------------------------------------------------------------------------
// Convenience hook — filters only (lighter re-render scope)
// ---------------------------------------------------------------------------

/**
 * useReportFilters — manages filter state for the map and report list.
 * Keeps filter logic out of the page components.
 */
export function useReportFilters() {
  const [filters, setFilters] = useState<ReportFilters>(defaultFilters());

  const updateFilters = useCallback(
    (partial: Partial<ReportFilters>) =>
      setFilters((prev) => ({ ...prev, ...partial })),
    []
  );

  const clearFilters = useCallback(() => setFilters(defaultFilters()), []);

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.severities.length > 0 ||
    filters.statuses.length > 0 ||
    filters.verifiedOnly ||
    filters.searchQuery.trim() !== "";

  return { filters, setFilters, updateFilters, clearFilters, hasActiveFilters };
}

// ---------------------------------------------------------------------------
// Convenience hook — stats only (for the admin dashboard header cards)
// ---------------------------------------------------------------------------

export function useReportStats(): ReportStats {
  const [stats, setStats] = useState<ReportStats>({
    total: 0,
    pending: 0,
    verified: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });

  useEffect(() => {
    setStats(getReportStats());
  }, []);

  return stats;
}

// ---------------------------------------------------------------------------
// Convenience hook — my reports only
// ---------------------------------------------------------------------------

export function useMyReports() {
  const [myReports, setMyReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMyReports(getMyReports());
    setIsLoading(false);
  }, []);

  const refresh = useCallback(() => {
    setMyReports(getMyReports());
  }, []);

  return { myReports, isLoading, refresh };
}
