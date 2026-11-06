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
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { DEMO_DISCLAIMER } from "@/lib/constants";

// Dynamically import the Leaflet map — ssr: false keeps all Leaflet code
// out of the server bundle entirely.
const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />,
  }
);

// ---------------------------------------------------------------------------
// Loading skeleton shown while Leaflet JS bundle downloads
// ---------------------------------------------------------------------------

function MapLoadingSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted/30">
      <Skeleton className="h-full w-full absolute inset-0 rounded-none" />
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

  // For Phase 05 we show all reports unfiltered.
  // Filters will be wired in Phase 07.
  const visibleReports = useMemo(() => reports, [reports]);

  const handleReportSelect = (report: Report) => {
    setSelectedReport((prev) => (prev?.id === report.id ? null : report));
  };

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

      {/* Map container — takes all remaining height */}
      <div className="relative flex-1" style={{ height: "calc(100% - 40px)" }}>
        <LeafletMap
          reports={visibleReports}
          selectedReportId={selectedReport?.id ?? null}
          onReportSelect={handleReportSelect}
          className="h-full w-full"
        />

        {/* Report count badge */}
        <div className="absolute bottom-6 left-3 z-[1000] rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-md backdrop-blur-sm">
          {visibleReports.length} report{visibleReports.length !== 1 ? "s" : ""} shown
        </div>
      </div>
    </div>
  );
}
