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

  // ---- Initial load + cross-component sync --------------------------------
  // We listen for two events:
  //   1. "roadsafe:reports-changed" — custom event fired by writeToStorage()
  //      after any write in the same browser tab
  //   2. "storage" — browser built-in event fired when localStorage changes
  //      in a DIFFERENT tab (so the admin tab and the map tab stay in sync)

  const loadReports = useCallback(() => {
    setReports(getReports());
  }, []);

  useEffect(() => {
    loadReports();
    setIsLoading(false);

    // Same-tab sync
    window.addEventListener("roadsafe:reports-changed", loadReports);
    // Cross-tab sync
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "roadsafe_reports" || e.key === null) {
        loadReports();
      }
    };
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("roadsafe:reports-changed", loadReports);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [loadReports]);

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
    // writeToStorage already dispatched the event — loadReports will fire
    // but we also call it directly for instant feedback
    loadReports();
    return newReport;
  }, [loadReports]);

  const updateStatus = useCallback(
    (id: string, newStatus: ReportStatus, adminNote?: string): Report | undefined => {
      const updated = updateReportStatus(id, newStatus, adminNote);
      if (updated) loadReports();
      return updated;
    },
    [loadReports]
  );

  const forceUpdateStatus = useCallback(
    (id: string, newStatus: ReportStatus, adminNote?: string): Report | undefined => {
      const updated = forceUpdateReportStatus(id, newStatus, adminNote);
      if (updated) loadReports();
      return updated;
    },
    [loadReports]
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
    resetToSeedData();
    loadReports();
  }, [loadReports]);

  const refresh = useCallback(() => {
    loadReports();
  }, [loadReports]);

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

  const loadStats = useCallback(() => {
    setStats(getReportStats());
  }, []);

  useEffect(() => {
    loadStats();
    window.addEventListener("roadsafe:reports-changed", loadStats);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "roadsafe_reports" || e.key === null) loadStats();
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("roadsafe:reports-changed", loadStats);
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadStats]);

  return stats;
}

// ---------------------------------------------------------------------------
// Convenience hook — my reports only
// ---------------------------------------------------------------------------

export function useMyReports() {
  const [myReports, setMyReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMyReports = useCallback(() => {
    setMyReports(getMyReports());
  }, []);

  useEffect(() => {
    loadMyReports();
    setIsLoading(false);

    window.addEventListener("roadsafe:reports-changed", loadMyReports);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "roadsafe_reports" || e.key === null) loadMyReports();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("roadsafe:reports-changed", loadMyReports);
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadMyReports]);

  const refresh = useCallback(() => {
    loadMyReports();
  }, [loadMyReports]);

  return { myReports, isLoading, refresh };
}
