"use client";

/**
 * LocationPickerMap — inner Leaflet component for location selection.
 * Loaded client-side only via LocationPicker (dynamic import, ssr:false).
 */

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import {
  MAP_DEFAULT_CENTER,
  TILE_URL,
  TILE_ATTRIBUTION,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Selected-pin icon — bright blue to distinguish from report markers
// ---------------------------------------------------------------------------

const PIN_ICON = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="32" height="43">
    <path d="M12 1C7.03 1 3 5.03 3 10c0 6.25 9 19 9 19s9-12.75 9-19c0-4.97-4.03-9-9-9z"
      fill="#2563eb" stroke="white" stroke-width="2"/>
    <circle cx="12" cy="10" r="4" fill="white" opacity="0.9"/>
  </svg>`,
  className: "",
  iconSize: [32, 43],
  iconAnchor: [16, 43],
  popupAnchor: [0, -43],
});

// ---------------------------------------------------------------------------
// Click handler — inner component that uses useMapEvents
// ---------------------------------------------------------------------------

function ClickHandler({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface LocationPickerMapProps {
  value: { lat: number; lng: number } | null;
  onChange: (location: { lat: number; lng: number; address?: string }) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LocationPickerMap({ value, onChange }: LocationPickerMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <MapContainer
      center={value ? [value.lat, value.lng] : MAP_DEFAULT_CENTER}
      zoom={12}
      className="h-full w-full cursor-crosshair"
      keyboard={false}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
      <ClickHandler onPick={(lat, lng) => onChange({ lat, lng })} />
      {value && (
        <Marker position={[value.lat, value.lng]} icon={PIN_ICON} />
      )}
    </MapContainer>
  );
}
