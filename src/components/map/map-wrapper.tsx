"use client";

/**
 * MapWrapper — Client Component that owns map state, filter state,
 * and dynamically imports LeafletMap with ssr: false.
 */

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import type { Report } from "@/types";
import { useReports, useReportFilters } from "@/hooks/use-reports";
import { filterReports } from "@/lib/reports";
import { ReportDetailPanel } from "@/components/map/report-detail-panel";
import { MapFilterPanel } from "@/components/map/map-filter-panel";
import { EmptyMapState } from "@/components/map/empty-map-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { DEMO_DISCLAIMER } from "@/lib/constants";

// ssr: false must be in a Client Component at module top level
const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />,
  }
);

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function MapLoadingSkeleton() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/30">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MapWrapperProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MapWrapper({ className }: MapWrapperProps) {
  const { reports, isLoading } = useReports();
  const { filters, setFilters, clearFilters } = useReportFilters();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Apply filters reactively — recalculates when reports or filters change
  const visibleReports = useMemo(
    () => filterReports(reports, filters),
    [reports, filters]
  );

  const handleReportSelect = (report: Report) => {
    setSelectedReport((prev) => (prev?.id === report.id ? null : report));
  };

  const handlePanelClose = () => setSelectedReport(null);

  // When filters change, deselect if the currently selected report is filtered out
  const effectiveSelectedReport =
    selectedReport &&
    visibleReports.some((r) => r.id === selectedReport.id)
      ? selectedReport
      : null;

  if (isLoading) {
    return (
      <div className={className}>
        <MapLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Demo disclaimer banner */}
      <div className="flex items-start gap-2 border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-800 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-300">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        <span>{DEMO_DISCLAIMER}</span>
      </div>

      {/* Filter toolbar */}
      <MapFilterPanel
        filters={filters}
        onChange={setFilters}
        totalCount={reports.length}
        filteredCount={visibleReports.length}
      />

      {/* Map + panels */}
      <div
        className="relative overflow-hidden"
        style={{ height: "calc(100% - 40px - 44px)" }}
      >
        {/* Map */}
        <LeafletMap
          reports={visibleReports}
          selectedReportId={effectiveSelectedReport?.id ?? null}
          onReportSelect={handleReportSelect}
          className="h-full w-full"
        />

        {/* Empty state overlay */}
        {visibleReports.length === 0 && (
          <EmptyMapState onClearFilters={clearFilters} />
        )}

        {/* Report count badge */}
        <div className="absolute bottom-6 left-3 z-[999] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-md backdrop-blur-sm">
          {visibleReports.length} of {reports.length} report
          {reports.length !== 1 ? "s" : ""}
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-1/2 z-[999] hidden -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 px-3 py-1 text-[10px] text-gray-500 shadow-md backdrop-blur-sm md:flex">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-gray-400 opacity-50" />
            Unverified
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500" />
            Verified
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2.5 rounded-full bg-red-500" />
            Critical
          </span>
        </div>

        {/* Slide-in detail panel */}
        <ReportDetailPanel
          report={effectiveSelectedReport}
          onClose={handlePanelClose}
        />
      </div>
    </div>
  );
}
