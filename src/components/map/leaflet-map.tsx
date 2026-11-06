"use client";

/**
 * LeafletMap — the core interactive map component.
 *
 * This component must only be rendered on the client (no SSR).
 * It is imported via MapWrapper which uses next/dynamic with ssr: false.
 *
 * Leaflet CSS is imported here so it is only bundled for the client.
 */

import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import type { Report } from "@/types";
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
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Custom SVG marker icon factory
// Using divIcon with SVG avoids the webpack/turbopack default-icon path bug.
// ---------------------------------------------------------------------------

function createMarkerIcon(color: string, isSelected: boolean): L.DivIcon {
  const size = isSelected ? 36 : 28;
  const borderWidth = isSelected ? 3 : 2;
  const shadow = isSelected
    ? `drop-shadow(0 2px 6px rgba(0,0,0,0.5))`
    : `drop-shadow(0 1px 3px rgba(0,0,0,0.35))`;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${size}" height="${Math.round(size * 1.33)}">
      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8z"
        fill="${color}"
        stroke="white"
        stroke-width="${borderWidth}"
        style="filter:${shadow}"
      />
      <circle cx="12" cy="8" r="3.5" fill="white" opacity="0.9"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "",          // prevents Leaflet adding its own white box class
    iconSize: [size, Math.round(size * 1.33)],
    iconAnchor: [size / 2, Math.round(size * 1.33)],
    popupAnchor: [0, -Math.round(size * 1.33)],
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

  // Pan to selected report when it changes
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
      // Prevents the map stealing keyboard focus from the rest of the page
      keyboard={false}
    >
      {/* OpenStreetMap tile layer */}
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

      {/* Report markers */}
      {reports.map((report) => {
        const color = CATEGORY_MARKER_COLORS[report.category];
        const isSelected = report.id === selectedReportId;
        const icon = createMarkerIcon(color, isSelected);

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
            {/* Tooltip — shown on hover */}
            <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
              <div className="min-w-[160px]">
                <p className="font-semibold text-gray-900">{report.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {CATEGORY_LABELS[report.category]} · {SEVERITY_LABELS[report.severity]}
                </p>
              </div>
            </Tooltip>

            {/* Popup — shown on click */}
            <Popup
              maxWidth={280}
              className="roadsafe-popup"
            >
              <PopupContent report={report} onViewDetail={onReportSelect} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// ---------------------------------------------------------------------------
// Popup content component
// ---------------------------------------------------------------------------

function PopupContent({
  report,
  onViewDetail,
}: {
  report: Report;
  onViewDetail?: (report: Report) => void;
}) {
  const statusColor = STATUS_COLORS[report.status];

  return (
    <div className="min-w-[220px] p-1 font-sans text-sm">
      {/* Title */}
      <p className="font-semibold text-gray-900 leading-snug mb-2">
        {report.title}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-1 mb-2">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          {CATEGORY_LABELS[report.category]}
        </span>
        <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
          {SEVERITY_LABELS[report.severity]}
        </span>
        <span className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
          statusColor
        )}>
          {STATUS_LABELS[report.status]}
        </span>
      </div>

      {/* Address */}
      {report.location.address && (
        <p className="text-xs text-gray-500 mb-2 leading-snug">
          📍 {report.location.address}
        </p>
      )}

      {/* Description preview */}
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
        {report.description}
      </p>

      {/* Demo disclaimer */}
      <p className="text-[10px] text-gray-400 italic mb-2">
        Sample data — not official statistics
      </p>

      {/* View detail button */}
      {onViewDetail && (
        <button
          onClick={() => onViewDetail(report)}
          className="w-full rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      )}
    </div>
  );
}
