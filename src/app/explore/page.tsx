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
 * This page is a Server Component. The map itself is loaded client-side
 * only via MapWrapper → dynamic(LeafletMap, { ssr: false }).
 *
 * NOTE: All data shown is community-submitted sample data for demonstration
 * purposes. Not official accident statistics.
 */
export default function ExplorePage() {
  return (
    // Full viewport height minus the navbar (56px = h-14)
    <div className="flex h-[calc(100vh-56px)] flex-col overflow-hidden">
      <MapWrapper className="flex h-full flex-col" />
    </div>
  );
}
