"use client";
"use no memo";

/**
 * MapMountGuard — ensures the map only renders after full client hydration
 * AND generates a fresh key on every client-side navigation so Leaflet
 * always initializes on a clean DOM node.
 *
 * Problem: useId() returns the same stable ID across soft navigations.
 * Leaflet detects an existing map instance on the same container and crashes.
 *
 * Solution: increment a counter on every mount so MapWrapper always gets
 * a new key → React unmounts the old Leaflet instance fully → fresh init.
 */

import { useState, useEffect } from "react";
import { MapWrapper } from "@/components/map/map-wrapper";
import { useLanguage } from "@/lib/i18n/language-context";

export function MapMountGuard({ className }: { className?: string }) {
  // Two-phase: first ensure we're client-side, then stamp a navigation key
  const [mountCount, setMountCount] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    // Increment on every mount — this covers both first load and
    // every subsequent client-side navigation back to /explore
    setMountCount((c) => c + 1);
  }, []);

  if (mountCount === 0) {
    // Not yet mounted in the browser — show spinner
    return (
      <div className={`${className ?? ""} flex items-center justify-center bg-muted/20`}>
        <div className="flex flex-col items-center gap-2">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">{t.explore.loadingMap}</p>
        </div>
      </div>
    );
  }

  // key changes on every navigation → React fully unmounts/remounts Leaflet
  return <MapWrapper key={`map-${mountCount}`} className={className} />;
}
