"use client";

/**
 * ReportListView — full report list page client component.
 * Owns filter state, search state, and detail dialog state.
 */

import { useState, useMemo } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportCard } from "@/components/reports/report-card";
import { ReportDetailDialog } from "@/components/reports/report-detail-dialog";
import { ReportListControls } from "@/components/reports/report-list-controls";
import { useReports, useReportFilters } from "@/hooks/use-reports";
import { filterReports } from "@/lib/reports";
import { DEMO_DISCLAIMER } from "@/lib/constants";
import type { Report } from "@/types";

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-xl" />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <AlertTriangle className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {hasFilters ? "No reports match your filters" : "No reports yet"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasFilters
            ? "Try adjusting or clearing the active filters."
            : "Be the first to report a road safety issue."}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={onClear}>
          Clear filters
        </Button>
      ) : (
        <Button size="sm" render={<Link href="/report" />} className="gap-1.5">
          <AlertTriangle className="size-3.5" />
          Submit a report
        </Button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ReportListView() {
  const { reports, isLoading } = useReports();
  const { filters, setFilters, clearFilters, hasActiveFilters } = useReportFilters();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredReports = useMemo(
    () => filterReports(reports, filters),
    [reports, filters]
  );

  const handleCardClick = (report: Report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Keep selectedReport so dialog close animation can still render content
    setTimeout(() => setSelectedReport(null), 300);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse community-submitted road safety reports.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/explore" />}
            className="gap-1.5"
          >
            <MapPin className="size-3.5" />
            View on map
          </Button>
          <Button
            size="sm"
            render={<Link href="/report" />}
            className="gap-1.5"
          >
            <AlertTriangle className="size-3.5" />
            Report issue
          </Button>
        </div>
      </div>

      {/* Demo disclaimer */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2.5 text-xs text-yellow-800 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-300">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        <span>{DEMO_DISCLAIMER}</span>
      </div>

      {/* Filters */}
      <div className="mb-5 rounded-xl border border-border bg-card p-4">
        <ReportListControls
          filters={filters}
          onChange={setFilters}
          totalCount={reports.length}
          filteredCount={filteredReports.length}
        />
      </div>

      {/* List */}
      {isLoading ? (
        <ListSkeleton />
      ) : filteredReports.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={handleCardClick}
              isSelected={selectedReport?.id === report.id}
            />
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <ReportDetailDialog
        report={selectedReport}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
}
