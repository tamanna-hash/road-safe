"use client";

/**
 * MapWrapper — Client Component that owns the map state and dynamically
 * imports LeafletMap with ssr: false.
 *
 * Per Next.js 16 rules, dynamic() with ssr:false must be called at the
 * top level of a Client Component — never inside a Server Component.
 */

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import type { Report } from "@/types";
import { useReports } from "@/hooks/use-reports";
import { ReportDetailPanel } from "@/components/map/report-detail-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { DEMO_DISCLAIMER } from "@/lib/constants";

// Dynamically import the Leaflet map — ssr: false keeps Leaflet out of the
// server bundle entirely. Must be at top level of a Client Component.
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
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // All reports shown unfiltered in Phase 05–06.
  // Filters will be wired in Phase 07.
  const visibleReports = useMemo(() => reports, [reports]);

  const handleReportSelect = (report: Report) => {
    // Clicking the same marker again deselects it
    setSelectedReport((prev) => (prev?.id === report.id ? null : report));
  };

  const handlePanelClose = () => setSelectedReport(null);

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

      {/* Map + detail panel container */}
      <div className="relative flex-1 overflow-hidden" style={{ height: "calc(100% - 40px)" }}>
        {/* Map */}
        <LeafletMap
          reports={visibleReports}
          selectedReportId={selectedReport?.id ?? null}
          onReportSelect={handleReportSelect}
          className="h-full w-full"
        />

        {/* Report count badge — sits above the map */}
        <div className="absolute bottom-6 left-3 z-[999] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-md backdrop-blur-sm">
          {visibleReports.length} report{visibleReports.length !== 1 ? "s" : ""} shown
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-1/2 z-[999] -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] text-gray-500 shadow-md backdrop-blur-sm hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-gray-400 opacity-50 ring-1 ring-dashed ring-gray-400" />
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
          report={selectedReport}
          onClose={handlePanelClose}
        />
      </div>
    </div>
  );
}
