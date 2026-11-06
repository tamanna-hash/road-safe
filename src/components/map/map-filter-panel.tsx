"use client";

/**
 * MapFilterPanel — horizontal filter toolbar for the explore map.
 *
 * Allows users to filter visible markers by:
 *   - Report category  (multi-select toggle)
 *   - Severity level   (multi-select toggle)
 *   - Verification     (verified-only toggle)
 *
 * Filters can be combined freely. "Clear All" resets everything.
 */

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  SEVERITY_LABELS,
  SEVERITY_COLORS,
} from "@/lib/constants";
import {
  ReportCategory,
  Severity,
  type ReportFilters,
  type ReportCategory as ReportCategoryType,
  type Severity as SeverityType,
} from "@/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MapFilterPanelProps {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
  totalCount: number;
  filteredCount: number;
}

// ---------------------------------------------------------------------------
// Small toggle chip
// ---------------------------------------------------------------------------

function FilterChip({
  label,
  active,
  colorClass,
  onClick,
}: {
  label: string;
  active: boolean;
  colorClass: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-3 text-xs font-medium transition-all",
        active
          ? cn(colorClass, "border-transparent shadow-sm")
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MapFilterPanel({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: MapFilterPanelProps) {
  const [expanded, setExpanded] = useState(false);

  // ---- helpers -------------------------------------------------------------

  const toggleCategory = (cat: ReportCategoryType) => {
    const current = filters.categories;
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleSeverity = (sev: SeverityType) => {
    const current = filters.severities;
    const next = current.includes(sev)
      ? current.filter((s) => s !== sev)
      : [...current, sev];
    onChange({ ...filters, severities: next });
  };

  const toggleVerified = () => {
    onChange({ ...filters, verifiedOnly: !filters.verifiedOnly });
  };

  const clearAll = () => {
    onChange({
      categories: [],
      severities: [],
      statuses: [],
      verifiedOnly: false,
      searchQuery: "",
    });
  };

  const activeCount =
    filters.categories.length +
    filters.severities.length +
    (filters.verifiedOnly ? 1 : 0);

  const hasActiveFilters = activeCount > 0;

  // ---- render --------------------------------------------------------------

  return (
    <div className="z-[999] border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top bar — always visible */}
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Toggle expand button */}
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors",
            hasActiveFilters
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:bg-muted"
          )}
        >
          <SlidersHorizontal className="size-3.5" />
          Filters
          {hasActiveFilters && (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
          {expanded ? (
            <ChevronUp className="size-3" />
          ) : (
            <ChevronDown className="size-3" />
          )}
        </button>

        {/* Quick active filter chips */}
        <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden">
          {filters.verifiedOnly && (
            <span className="inline-flex h-6 items-center gap-1 rounded-full bg-green-100 px-2 text-[11px] font-medium text-green-700">
              ✓ Verified only
              <button
                onClick={() => onChange({ ...filters, verifiedOnly: false })}
                className="ml-0.5 hover:text-green-900"
                aria-label="Remove verified filter"
              >
                <X className="size-2.5" />
              </button>
            </span>
          )}
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className={cn(
                "inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium",
                CATEGORY_COLORS[cat]
              )}
            >
              {CATEGORY_LABELS[cat]}
              <button
                onClick={() => toggleCategory(cat)}
                className="ml-0.5 opacity-70 hover:opacity-100"
                aria-label={`Remove ${CATEGORY_LABELS[cat]} filter`}
              >
                <X className="size-2.5" />
              </button>
            </span>
          ))}
          {filters.severities.map((sev) => (
            <span
              key={sev}
              className={cn(
                "inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium",
                SEVERITY_COLORS[sev]
              )}
            >
              {SEVERITY_LABELS[sev]}
              <button
                onClick={() => toggleSeverity(sev)}
                className="ml-0.5 opacity-70 hover:opacity-100"
                aria-label={`Remove ${SEVERITY_LABELS[sev]} filter`}
              >
                <X className="size-2.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Result count + clear */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {filteredCount} of {totalCount}
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="xs"
              onClick={clearAll}
              className="h-7 text-xs"
            >
              <X className="size-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Expanded filter panel */}
      {expanded && (
        <div className="border-t border-border px-3 py-3 space-y-3">
          {/* Category filters */}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.values(ReportCategory) as ReportCategoryType[]).map((cat) => (
                <FilterChip
                  key={cat}
                  label={CATEGORY_LABELS[cat]}
                  active={filters.categories.includes(cat)}
                  colorClass={CATEGORY_COLORS[cat]}
                  onClick={() => toggleCategory(cat)}
                />
              ))}
            </div>
          </div>

          {/* Severity filters */}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Severity
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.values(Severity) as SeverityType[]).map((sev) => (
                <FilterChip
                  key={sev}
                  label={SEVERITY_LABELS[sev]}
                  active={filters.severities.includes(sev)}
                  colorClass={SEVERITY_COLORS[sev]}
                  onClick={() => toggleSeverity(sev)}
                />
              ))}
            </div>
          </div>

          {/* Verification filter */}
          <div>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Verification
            </p>
            <div className="flex gap-1.5">
              <FilterChip
                label="✓ Verified only"
                active={filters.verifiedOnly}
                colorClass="bg-green-100 text-green-800"
                onClick={toggleVerified}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
