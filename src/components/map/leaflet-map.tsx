"use client";

/**
 * LeafletMap — core interactive map component.
 * Must only be rendered client-side (imported via MapWrapper with ssr:false).
 */

import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import type { Report, Severity as SeverityType } from "@/types";
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  TILE_URL,
  TILE_ATTRIBUTION,
  CATEGORY_MARKER_COLORS,
  SEVERITY_LABELS,
  CATEGORY_LABELS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Marker sizing — severity determines pin size
// ---------------------------------------------------------------------------

const SEVERITY_SIZES: Record<SeverityType, number> = {
  LOW: 24,
  MEDIUM: 28,
  HIGH: 32,
  CRITICAL: 38,
};

// ---------------------------------------------------------------------------
// SVG marker icon factory
// Visual language:
//   Verified (VERIFIED / IN_PROGRESS / RESOLVED) → solid white ring, full opacity
//   Pending  → dashed white ring, slightly reduced opacity
//   Rejected → grey fill, dashed ring, low opacity
// ---------------------------------------------------------------------------

function createMarkerIcon(report: Report, isSelected: boolean): L.DivIcon {
  const isVerified =
    report.status === "VERIFIED" ||
    report.status === "IN_PROGRESS" ||
    report.status === "RESOLVED";
  const isRejected = report.status === "REJECTED";

  const baseSize = SEVERITY_SIZES[report.severity];
  const size = isSelected ? baseSize + 8 : baseSize;
  const height = Math.round(size * 1.35);

  // Rejected markers are greyed out
  const fill = isRejected ? "#9ca3af" : CATEGORY_MARKER_COLORS[report.category];

  // Ring style — solid for verified, dashed for unverified/pending
  const strokeDasharray = isVerified ? "none" : "3 2";
  const outerOpacity = isRejected ? 0.45 : isVerified ? 1 : 0.8;

  // Selected ring — bright blue outline
  const selectionRing = isSelected
    ? `<circle cx="12" cy="8" r="10.5" fill="none" stroke="#3b82f6" stroke-width="2.5" opacity="0.9"/>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${size}" height="${height}" style="opacity:${outerOpacity}">
  ${selectionRing}
  <path d="M12 1C7.03 1 3 5.03 3 10c0 6.25 9 19 9 19s9-12.75 9-19c0-4.97-4.03-9-9-9z"
    fill="${fill}"
    stroke="white"
    stroke-width="1.8"
    stroke-dasharray="${strokeDasharray}"
  />
  <circle cx="12" cy="10" r="3.8" fill="white" opacity="0.9"/>
  ${
    report.severity === "CRITICAL"
      ? `<text x="12" y="14" text-anchor="middle" font-size="5" font-weight="bold" fill="${fill}">!</text>`
      : ""
  }
</svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [size, height],
    iconAnchor: [size / 2, height],
    popupAnchor: [0, -height],
    tooltipAnchor: [size / 2, -(height / 2)],
  });
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface LeafletMapProps {
  reports: Report[];
  selectedReportId?: string | null;
  onReportSelect?: (report: Report) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LeafletMap({
  reports,
  selectedReportId,
  onReportSelect,
  className,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Pan to selected report
  useEffect(() => {
    if (!selectedReportId || !mapRef.current) return;
    const report = reports.find((r) => r.id === selectedReportId);
    if (report) {
      mapRef.current.setView(
        [report.location.lat, report.location.lng],
        Math.max(mapRef.current.getZoom(), 14),
        { animate: true }
      );
    }
  }, [selectedReportId, reports]);

  return (
    <MapContainer
      ref={mapRef}
      center={MAP_DEFAULT_CENTER}
      zoom={MAP_DEFAULT_ZOOM}
      minZoom={MAP_MIN_ZOOM}
      maxZoom={MAP_MAX_ZOOM}
      className={cn("h-full w-full", className)}
      keyboard={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

      {reports.map((report) => {
        const isSelected = report.id === selectedReportId;
        const icon = createMarkerIcon(report, isSelected);

        return (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={icon}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{
              click: () => onReportSelect?.(report),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -4]}
              opacity={0.97}
              permanent={false}
            >
              <TooltipContent report={report} />
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// ---------------------------------------------------------------------------
// Tooltip content (hover)
// ---------------------------------------------------------------------------

function TooltipContent({ report }: { report: Report }) {
  const isVerified =
    report.status === "VERIFIED" ||
    report.status === "IN_PROGRESS" ||
    report.status === "RESOLVED";

  return (
    <div className="min-w-[180px] max-w-[240px]">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-gray-900 text-xs leading-snug">
          {report.title}
        </p>
        {isVerified && (
          <span className="shrink-0 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
            ✓ Verified
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-gray-500">
        {CATEGORY_LABELS[report.category]} ·{" "}
        <span className={
          report.severity === "CRITICAL" ? "font-semibold text-red-600" :
          report.severity === "HIGH" ? "text-orange-600" :
          "text-gray-500"
        }>
          {SEVERITY_LABELS[report.severity]}
        </span>
      </p>
      {report.location.address && (
        <p className="mt-0.5 text-[10px] text-gray-400 truncate">
          📍 {report.location.address}
        </p>
      )}
    </div>
  );
}
