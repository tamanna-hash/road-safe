import type { Metadata } from "next";
import { MapMountGuard } from "@/components/map/map-mount-guard";

export const metadata: Metadata = {
  title: "Explore Map",
  description:
    "Browse reported road safety issues on an interactive map. Filter by category, severity, and verification status.",
};

/**
 * Explore page — Interactive road risk map.
 *
 * MapMountGuard ensures Leaflet only initialises after the browser DOM is
 * fully ready, preventing the appendChild error that occurs when the React
 * Compiler pre-executes components during client-side navigation.
 */
export default function ExplorePage() {
  return (
    <div
      className="flex flex-col overflow-hidden w-full"
      style={{ height: "calc(100dvh - 56px)" }}
    >
      <MapMountGuard className="flex flex-1 flex-col overflow-hidden" />
    </div>
  );
}
