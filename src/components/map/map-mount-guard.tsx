"use client";
// 'use no memo'

/**
 * MapMountGuard — ensures the map only renders after full client hydration.
 *
 * Leaflet requires a real browser DOM. During client-side navigation with
 * the React Compiler enabled, components can be pre-executed before their
 * container DOM nodes exist. This guard delays rendering until useEffect
 * confirms we are fully mounted in the browser.
 */

import { useState, useEffect, useId } from "react";
import { MapWrapper } from "@/components/map/map-wrapper";

export function MapMountGuard({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const instanceKey = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`${className ?? ""} flex items-center justify-center bg-muted/20`}>
        <div className="flex flex-col items-center gap-2">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading map…</p>
        </div>
      </div>
    );
  }

  return <MapWrapper key={instanceKey} className={className} />;
}
