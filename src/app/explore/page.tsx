import { Suspense } from "react";
import type { Metadata } from "next";
import { MapMountGuard } from "@/components/map/map-mount-guard";

export const metadata: Metadata = {
  title: "Explore Map",
  description:
    "Browse reported road safety issues on an interactive map. Filter by category, severity, and verification status.",
};

function MapLoader() {
  return (
    <div className="flex flex-1 items-center justify-center bg-muted/20">
      <div className="flex flex-col items-center gap-3">
        <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Suspense fallback={<MapLoader />}>
        <MapMountGuard className="flex flex-1 flex-col overflow-hidden" />
      </Suspense>
    </div>
  );
}
