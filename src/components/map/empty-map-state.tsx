"use client";

import { SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyMapStateProps {
  onClearFilters: () => void;
}

/**
 * Shown as an overlay on the map when active filters return zero markers.
 */
export function EmptyMapState({ onClearFilters }: EmptyMapStateProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[998] flex items-center justify-center">
      <div className="pointer-events-auto flex flex-col items-center gap-3 rounded-xl bg-background/95 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <MapPin className="size-6 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">No reports match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting or clearing the active filters.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="gap-1.5"
        >
          <SlidersHorizontal className="size-3.5" />
          Clear filters
        </Button>
      </div>
    </div>
  );
}
