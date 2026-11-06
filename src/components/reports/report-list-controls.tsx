"use client";

/**
 * ReportListControls — search input + status/severity filter chips
 * for the report list page.
 */

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SEVERITY_LABELS, SEVERITY_COLORS,
  STATUS_LABELS, STATUS_COLORS,
} from "@/lib/constants";
import {
  ReportStatus, Severity,
  type ReportFilters,
  type ReportStatus as ReportStatusType,
  type Severity as SeverityType,
} from "@/types";

interface ReportListControlsProps {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
  totalCount: number;
  filteredCount: number;
}

function Chip({
  label, active, colorClass, onClick,
}: {
  label: string; active: boolean; colorClass: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-medium transition-all",
        active
          ? cn(colorClass, "border-transparent shadow-sm")
          : "border-border bg-background text-muted-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  );
}

export function ReportListControls({
  filters, onChange, totalCount, filteredCount,
}: ReportListControlsProps) {
  const toggleStatus = (s: ReportStatusType) => {
    const next = filters.statuses.includes(s)
      ? filters.statuses.filter((x) => x !== s)
      : [...filters.statuses, s];
    onChange({ ...filters, statuses: next });
  };

  const toggleSeverity = (s: SeverityType) => {
    const next = filters.severities.includes(s)
      ? filters.severities.filter((x) => x !== s)
      : [...filters.severities, s];
    onChange({ ...filters, severities: next });
  };

  const hasFilters =
    filters.statuses.length > 0 ||
    filters.severities.length > 0 ||
    filters.searchQuery.trim() !== "";

  const clearAll = () =>
    onChange({ ...filters, statuses: [], severities: [], searchQuery: "" });

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search reports…"
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="pl-8"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, searchQuery: "" })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Status filter chips */}
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(Object.values(ReportStatus) as ReportStatusType[]).map((s) => (
            <Chip
              key={s}
              label={STATUS_LABELS[s]}
              active={filters.statuses.includes(s)}
              colorClass={STATUS_COLORS[s]}
              onClick={() => toggleStatus(s)}
            />
          ))}
        </div>
      </div>

      {/* Severity filter chips */}
      <div>
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Severity
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(Object.values(Severity) as SeverityType[]).map((s) => (
            <Chip
              key={s}
              label={SEVERITY_LABELS[s]}
              active={filters.severities.includes(s)}
              colorClass={SEVERITY_COLORS[s]}
              onClick={() => toggleSeverity(s)}
            />
          ))}
        </div>
      </div>

      {/* Result count + clear */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredCount}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> reports
        </p>
        {hasFilters && (
          <Button variant="ghost" size="xs" onClick={clearAll} className="gap-1">
            <X className="size-3" /> Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
