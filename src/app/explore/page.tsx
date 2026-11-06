import type { Metadata } from "next";
import { MapWrapper } from "@/components/map/map-wrapper";

export const metadata: Metadata = {
  title: "Explore Map",
  description:
    "Browse reported road safety issues on an interactive map. Filter by category, severity, and verification status.",
};

/**
 * Explore page — Interactive road risk map.
 *
 * Uses flex layout so the map fills all remaining viewport height without
 * relying on hard-coded pixel calculations. The root layout's <main> is
 * already flex-col flex-1, so this page just needs to be flex-col flex-1
 * as well and the map will grow to fill everything below the navbar.
 */
export default function ExplorePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <MapWrapper className="flex flex-1 flex-col overflow-hidden" />
    </div>
  );
}
