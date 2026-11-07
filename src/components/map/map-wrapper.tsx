"use client";
"use no memo";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import type { Report } from "@/types";
import { useReports, useReportFilters } from "@/hooks/use-reports";
import { filterReports } from "@/lib/reports";
import { useLanguage } from "@/lib/i18n/language-context";
import { ReportDetailPanel } from "@/components/map/report-detail-panel";
import { MapFilterPanel } from "@/components/map/map-filter-panel";
import { EmptyMapState } from "@/components/map/empty-map-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

// Static loading fallback — NO hooks allowed here (runs during SSR)
function MapLoadingFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/30">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
  );
}

// ssr: false must be in a Client Component at module top level
const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => <MapLoadingFallback />,
  }
);

// ---------------------------------------------------------------------------
// Loading skeleton (client-side only — safe to use hooks)
// ---------------------------------------------------------------------------

function MapLoadingSkeleton() {
  const { t } = useLanguage();
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/30">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">{t.explore.loadingMap}</p>
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
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const visibleReports = useMemo(() => filterReports(reports, filters), [reports, filters]);
  const handleReportSelect = (report: Report) => setSelectedReport((prev) => (prev?.id === report.id ? null : report));
  const handlePanelClose = () => setSelectedReport(null);

  const effectiveSelectedReport = selectedReport && visibleReports.some((r) => r.id === selectedReport.id) ? selectedReport : null;

  if (isLoading) {
    return (
      <div className={`${className ?? ""} h-full`}>
        <MapLoadingSkeleton />
      </div>
    );
  }
  return (
    <div className={`${className ?? ""} h-full`}>
      {/* Demo disclaimer banner */}
      <div className="flex items-start gap-2 border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-800 dark:border-yellow-900/40 dark:bg-yellow-950/20 dark:text-yellow-300">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        <span>{t.explore.disclaimer}</span>
      </div>

      {/* Filter toolbar */}
      <MapFilterPanel filters={filters} onChange={setFilters} totalCount={reports.length} filteredCount={visibleReports.length} />

      {/* Map + panels */}
      <div className="relative flex-1 overflow-hidden">
        <LeafletMap
          reports={visibleReports}
          selectedReportId={effectiveSelectedReport?.id ?? null}
          onReportSelect={handleReportSelect}
          className="h-full w-full"
        />

        {visibleReports.length === 0 && <EmptyMapState onClearFilters={clearFilters} />}

        {/* Count badge */}
        <div className="absolute bottom-6 left-3 z-[999] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-md backdrop-blur-sm">
          {t.explore.reportCount(visibleReports.length, reports.length)}
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-1/2 z-[999] hidden -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 px-3 py-1 text-[10px] text-gray-500 shadow-md backdrop-blur-sm md:flex">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-gray-400 opacity-50" />
            {t.explore.legend.unverified}
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500" />
            {t.explore.legend.verified}
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2.5 rounded-full bg-red-500" />
            {t.explore.legend.critical}
          </span>
        </div>

        <ReportDetailPanel report={effectiveSelectedReport} onClose={handlePanelClose} />
      </div>
    </div>
  );
}
