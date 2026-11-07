"use client";

import { SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

interface EmptyMapStateProps {
  onClearFilters: () => void;
}

export function EmptyMapState({ onClearFilters }: EmptyMapStateProps) {
  const { t } = useLanguage();
  const e = t.explore.emptyState;
  return (
    <div className="pointer-events-none absolute inset-0 z-[998] flex items-center justify-center">
      <div className="pointer-events-auto flex flex-col items-center gap-3 rounded-xl bg-background/95 p-6 shadow-lg backdrop-blur-sm">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <MapPin className="size-6 text-muted-foreground" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">{e.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClearFilters} className="gap-1.5">
          <SlidersHorizontal className="size-3.5" />
          {e.clearFilters}
        </Button>
      </div>
    </div>
  );
}
