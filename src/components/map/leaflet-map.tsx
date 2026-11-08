"use client";

/**
 * LeafletMap — vanilla Leaflet implementation (no react-leaflet).
 *
 * react-leaflet's MapContainer + TileLayer have an initialization race:
 * they call Leaflet's DOM APIs synchronously during React render, which
 * crashes when the component is pre-executed before the DOM is ready.
 *
 * This implementation initializes the map entirely inside useEffect,
 * which is guaranteed to run only after the DOM node exists.
 * All marker/tooltip management is also done imperatively in effects.
 */

import "leaflet/dist/leaflet.css";

import { useEffect, useRef } from "react";
import type L from "leaflet";
import type { Report, Severity as SeverityType } from "@/types";
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_MIN_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MAX_BOUNDS,
  TILE_URL,
  TILE_ATTRIBUTION,
  CATEGORY_MARKER_COLORS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Marker helpers
// ---------------------------------------------------------------------------

const SEVERITY_SIZES: Record<SeverityType, number> = {
  LOW: 24, MEDIUM: 28, HIGH: 32, CRITICAL: 38,
};

function createMarkerIcon(LRef: typeof L, report: Report, isSelected: boolean): L.DivIcon {
  const isVerified = ["VERIFIED", "IN_PROGRESS", "RESOLVED"].includes(report.status);
  const isRejected = report.status === "REJECTED";

  const baseSize = SEVERITY_SIZES[report.severity];
  const size = isSelected ? baseSize + 8 : baseSize;
  const height = Math.round(size * 1.35);

  const fill = isRejected ? "#9ca3af" : CATEGORY_MARKER_COLORS[report.category];
  const strokeDasharray = isVerified ? "none" : "3 2";
  const outerOpacity = isRejected ? 0.45 : isVerified ? 1 : 0.8;

  const selectionRing = isSelected
    ? `<circle cx="12" cy="8" r="10.5" fill="none" stroke="#3b82f6" stroke-width="2.5" opacity="0.9"/>`
    : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="${size}" height="${height}" style="opacity:${outerOpacity}">
  ${selectionRing}
  <path d="M12 1C7.03 1 3 5.03 3 10c0 6.25 9 19 9 19s9-12.75 9-19c0-4.97-4.03-9-9-9z"
    fill="${fill}" stroke="white" stroke-width="1.8" stroke-dasharray="${strokeDasharray}"/>
  <circle cx="12" cy="10" r="3.8" fill="white" opacity="0.9"/>
  ${report.severity === "CRITICAL"
    ? `<text x="12" y="14" text-anchor="middle" font-size="5" font-weight="bold" fill="${fill}">!</text>`
    : ""}
</svg>`;

  return LRef.divIcon({
    html: svg,
    className: "",
    iconSize: [size, height],
    iconAnchor: [size / 2, height],
    popupAnchor: [0, -height],
    tooltipAnchor: [size / 2, -(height / 2)],
  });
}

function buildTooltipHtml(report: Report, categoryLabel: string, severityLabel: string, verifiedLabel: string, isVerified: boolean): string {
  const severityColor =
    report.severity === "CRITICAL" ? "color:#dc2626;font-weight:600" :
    report.severity === "HIGH" ? "color:#ea580c" : "color:#6b7280";

  const verifiedBadge = isVerified
    ? `<span style="flex-shrink:0;border-radius:9999px;background:#dcfce7;padding:1px 6px;font-size:10px;font-weight:500;color:#15803d;white-space:nowrap">✓ ${verifiedLabel}</span>`
    : "";

  const addressLine = report.location.address
    ? `<p style="margin:2px 0 0;font-size:10px;color:#9ca3af;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">📍 ${report.location.address}</p>`
    : "";

  return `<div style="width:220px;max-width:220px;overflow:hidden;font-family:system-ui,sans-serif">
  <div style="display:flex;align-items:flex-start;gap:6px">
    <p style="flex:1;min-width:0;font-weight:600;font-size:12px;color:#111827;line-height:1.3;word-break:break-word;margin:0">${report.title}</p>
    ${verifiedBadge}
  </div>
  <p style="margin:4px 0 0;font-size:11px;color:#6b7280;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
    ${categoryLabel} · <span style="${severityColor}">${severityLabel}</span>
  </p>
  ${addressLine}
</div>`;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface LeafletMapProps {
  reports: Report[];
  selectedReportId?: string | null;
  onReportSelect?: (report: Report) => void;
  className?: string;
  categoryLabels: Record<string, string>;
  severityLabels: Record<string, string>;
  verifiedLabel: string;
}

// ---------------------------------------------------------------------------
// Component — all Leaflet work happens inside useEffect (DOM guaranteed)
// ---------------------------------------------------------------------------

export function LeafletMap({
  reports,
  selectedReportId,
  onReportSelect,
  className,
  categoryLabels,
  severityLabels,
  verifiedLabel,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const LRef = useRef<typeof L | null>(null);

  // --- Initialize map once on mount ---
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((mod) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const L = mod.default;
      LRef.current = L;

      const map = L.map(containerRef.current, {
        center: MAP_DEFAULT_CENTER,
        zoom: MAP_DEFAULT_ZOOM,
        minZoom: MAP_MIN_ZOOM,
        maxZoom: MAP_MAX_ZOOM,
        maxBounds: MAP_MAX_BOUNDS as L.LatLngBoundsExpression,
        maxBoundsViscosity: 1.0,
        keyboard: false,
        zoomControl: true,
      });

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        noWrap: true,
      }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
        LRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Sync markers when reports or selection changes ---
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L) return;

    const existingIds = new Set(markersRef.current.keys());
    const newIds = new Set(reports.map((r) => r.id));

    // Remove stale markers
    existingIds.forEach((id) => {
      if (!newIds.has(id)) {
        markersRef.current.get(id)?.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    reports.forEach((report) => {
      const isSelected = report.id === selectedReportId;
      const isVerified = ["VERIFIED", "IN_PROGRESS", "RESOLVED"].includes(report.status);
      const icon = createMarkerIcon(L, report, isSelected);
      const tooltipHtml = buildTooltipHtml(
        report,
        categoryLabels[report.category] ?? report.category,
        severityLabels[report.severity] ?? report.severity,
        verifiedLabel,
        isVerified
      );

      const existing = markersRef.current.get(report.id);
      if (existing) {
        existing.setIcon(icon);
        existing.setZIndexOffset(isSelected ? 1000 : 0);
        existing.unbindTooltip();
        existing.bindTooltip(tooltipHtml, {
          direction: "top", offset: [0, -8], opacity: 1,
          className: "leaflet-tooltip-custom",
        });
      } else {
        const marker = L.marker([report.location.lat, report.location.lng], {
          icon,
          zIndexOffset: isSelected ? 1000 : 0,
        });
        marker.bindTooltip(tooltipHtml, {
          direction: "top", offset: [0, -8], opacity: 1,
          className: "leaflet-tooltip-custom",
        });
        marker.on("click", () => onReportSelect?.(report));
        marker.addTo(map);
        markersRef.current.set(report.id, marker);
      }
    });
  }, [reports, selectedReportId, categoryLabels, severityLabels, verifiedLabel, onReportSelect]);

  // --- Pan to selected report ---
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedReportId) return;
    const report = reports.find((r) => r.id === selectedReportId);
    if (report) {
      map.setView(
        [report.location.lat, report.location.lng],
        Math.max(map.getZoom(), 14),
        { animate: true }
      );
    }
  }, [selectedReportId, reports]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      aria-label="Interactive road safety map"
    />
  );
}
