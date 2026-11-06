"use client";

/**
 * LocationPicker — form field wrapper around the Leaflet location picker map.
 *
 * Dynamically imports LocationPickerMap with ssr:false (Leaflet is browser-only).
 * Displays the selected coordinates below the map and allows manual lat/lng entry.
 */

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapPin, LocateFixed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ssr: false at top level of this Client Component
const LocationPickerMap = dynamic(
  () =>
    import("./location-picker-map").then((mod) => mod.LocationPickerMap),
  { ssr: false, loading: () => <MapPlaceholder /> }
);

function MapPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted/30">
      <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface LocationPickerProps {
  value: { lat: number; lng: number; address?: string } | null;
  onChange: (location: { lat: number; lng: number; address?: string } | null) => void;
  error?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LocationPicker({ value, onChange, error }: LocationPickerProps) {
  const [showMap, setShowMap] = useState(false);

  const handleMapPick = (location: { lat: number; lng: number; address?: string }) => {
    onChange(location);
  };

  const handleClear = () => {
    onChange(null);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setShowMap(true);
      },
      () => {
        // Permission denied or unavailable — fail silently
      }
    );
  };

  return (
    <div className="space-y-2">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={showMap ? "default" : "outline"}
          size="sm"
          onClick={() => setShowMap((v) => !v)}
          className="gap-1.5"
        >
          <MapPin className="size-3.5" />
          {showMap ? "Hide map" : "Pick on map"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          className="gap-1.5"
        >
          <LocateFixed className="size-3.5" />
          Use my location
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="gap-1.5 text-muted-foreground"
          >
            <X className="size-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Map */}
      {showMap && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border",
            error ? "border-destructive" : "border-border"
          )}
          style={{ height: 260 }}
        >
          <LocationPickerMap value={value} onChange={handleMapPick} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent p-2">
            <p className="text-center text-xs text-white/90">
              Click anywhere on the map to pin the location
            </p>
          </div>
        </div>
      )}

      {/* Selected coordinates display */}
      {value ? (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/40 dark:bg-green-950/20">
          <MapPin className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
          <div className="min-w-0">
            {value.address && (
              <p className="text-sm font-medium text-green-800 dark:text-green-300 truncate">
                {value.address}
              </p>
            )}
            <p className="font-mono text-xs text-green-700 dark:text-green-400">
              {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          No location selected. Click "Pick on map" or use your current location.
        </p>
      )}

      {/* Validation error */}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
