"use client";
"use no memo";

import dynamic from "next/dynamic";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Report } from "@/types";
import { useReports, useReportFilters } from "@/hooks/use-reports";
import { filterReports } from "@/lib/reports";
import { useLanguage } from "@/lib/i18n/language-context";
import { ReportDetailPanel } from "@/components/map/report-detail-panel";
import { MapFilterPanel } from "@/components/map/map-filter-panel";
import { EmptyMapState } from "@/components/map/empty-map-state";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

// ---------------------------------------------------------------------------
// Loading fallback — NO hooks (this runs during SSR/static generation)
// ---------------------------------------------------------------------------

function MapLoadingFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/30">
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative z-10 size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

// ssr:false — LeafletMap module never evaluated on the server
const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <MapLoadingFallback /> }
);

// ---------------------------------------------------------------------------
// Loading skeleton — hooks safe here (only runs client-side in MapWrapper)
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
// Component
// ---------------------------------------------------------------------------

interface MapWrapperProps { className?: string; }

export function MapWrapper({ className }: MapWrapperProps) {
  const { reports, isLoading } = useReports();
  const { filters, setFilters, clearFilters } = useReportFilters();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const visibleReports = useMemo(() => filterReports(reports, filters), [reports, filters]);

  // Pre-select a report when navigated from another page via ?id=
  useEffect(() => {
    const id = searchParams.get("id");
    if (!id || reports.length === 0) return;
    const found = reports.find((r) => r.id === id);
    if (found) setSelectedReport(found);
  }, [searchParams, reports]);

  const handleReportSelect = (report: Report) =>
    setSelectedReport((prev) => (prev?.id === report.id ? null : report));

  const handlePanelClose = () => setSelectedReport(null);

  const effectiveSelectedReport =
    selectedReport && visibleReports.some((r) => r.id === selectedReport.id)
      ? selectedReport : null;

  // Outermost container: full height, column flex, no overflow clip
  const outerCls = `${className ?? ""} flex flex-col h-full overflow-hidden`;

  if (isLoading) {
    return (
      <div className={outerCls}>
        <MapLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className={outerCls}>
      {/* Demo disclaimer — subtle, not yellow */}
      <div className="shrink-0 flex items-center gap-2 border-b bg-blue-50/60 px-4 py-2 text-xs text-blue-900 dark:bg-blue-950/30 dark:text-blue-200 backdrop-blur-sm z-10 relative">
        <AlertTriangle className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
        <span className="flex-1">{t.explore.disclaimer}</span>
      </div>

      {/* Filter toolbar */}
      <div className="shrink-0 relative z-10">
        <MapFilterPanel
          filters={filters}
          onChange={setFilters}
          totalCount={reports.length}
          filteredCount={visibleReports.length}
        />
      </div>

      {/* Map area — takes remaining height, no overlap */}
      <div className="relative min-h-0 flex-1 bg-gray-100 dark:bg-gray-900">
        <div className="absolute inset-0">
          <LeafletMap
            reports={visibleReports}
            selectedReportId={effectiveSelectedReport?.id ?? null}
            onReportSelect={handleReportSelect}
            className="h-full w-full"
          />
        </div>

        {visibleReports.length === 0 && (
          <EmptyMapState onClearFilters={clearFilters} />
        )}

        {/* Count badge — bottom left */}
        <div className="absolute bottom-4 left-4 z-[999] rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur-md border border-gray-200/50 dark:bg-gray-900/95 dark:text-gray-100 dark:border-gray-700/50">
          {t.explore.reportCount(visibleReports.length, reports.length)}
        </div>

        {/* Legend — bottom center, category colors, hide on mobile */}
        <div className="absolute bottom-4 left-1/2 z-[999] hidden -translate-x-1/2 items-center gap-3 rounded-lg bg-white/95 px-4 py-2 text-[11px] font-medium text-gray-700 shadow-lg backdrop-blur-md border border-gray-200/50 md:flex flex-wrap max-w-lg dark:bg-gray-900/95 dark:text-gray-300 dark:border-gray-700/50">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#f97316" }} />
            {t.category.POTHOLE}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#eab308" }} />
            {t.category.POOR_LIGHTING}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#a855f7" }} />
            {t.category.MISSING_SIGNAGE}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
            {t.category.ROAD_FLOODING}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#ef4444" }} />
            {t.category.DANGEROUS_CURVE}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#d97706" }} />
            {t.category.ROAD_DAMAGE}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full shrink-0" style={{ background: "#6b7280" }} />
            {t.category.BLOCKED_ROAD}
          </span>
        </div>

        <ReportDetailPanel report={effectiveSelectedReport} onClose={handlePanelClose} />
      </div>
    </div>
  );
}
