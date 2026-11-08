"use client";

/**
 * MapMountGuard — defers MapWrapper until after browser hydration.
 *
 * Uses a counter key (not useId) so every client-side navigation to
 * /explore gets a fresh MapWrapper instance — Leaflet's map.remove()
 * cleanup in useEffect handles teardown of the previous instance.
 *
 * The parent <Suspense> in explore/page.tsx handles the loading UI
 * while useSearchParams (used inside MapWrapper) resolves.
 */

import { useState, useEffect } from "react";
import { MapWrapper } from "@/components/map/map-wrapper";

export function MapMountGuard({ className }: { className?: string }) {
  const [mountCount, setMountCount] = useState(0);

  useEffect(() => {
    setMountCount((c) => c + 1);
  }, []);

  if (mountCount === 0) {
    // Still server-side or first paint — Suspense fallback handles the UI
    return null;
  }

  return <MapWrapper key={`map-${mountCount}`} className={className} />;
}
