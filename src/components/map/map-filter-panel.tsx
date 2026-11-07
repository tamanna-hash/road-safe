"use client";

import { Check, ChevronDown, SlidersHorizontal, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS, SEVERITY_COLORS, DISTRICTS, DISTRICT_BN } from "@/lib/constants";
import {
  ReportCategory, Severity,
  type ReportFilters,
  type ReportCategory as ReportCategoryType,
  type Severity as SeverityType,
} from "@/types";
import { useLanguage } from "@/lib/i18n/language-context";

interface MapFilterPanelProps {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
  totalCount: number;
  filteredCount: number;
}

// ---------------------------------------------------------------------------
// FilterDropdown — generic multi-select or toggle dropdown
// ---------------------------------------------------------------------------

interface FilterDropdownProps<T extends string> {
  label: string;
  activeCount: number;
  items: { value: T; label: string; color?: string }[];
  selected: T[];
  onToggle: (value: T) => void;
  onClear: () => void;
  scrollable?: boolean;
}

function FilterDropdown<T extends string>({
  label, activeCount, items, selected, onToggle, onClear, scrollable,
}: FilterDropdownProps<T>) {
  const isActive = activeCount > 0;
  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors",
              isActive
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          />
        }
      >
        {label}
        {isActive && (
          <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {activeCount}
          </span>
        )}
        <ChevronDown className="size-3 opacity-60" />
      </Popover.Trigger>

      <Popover.Content className="w-52">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          {isActive && (
            <button
              type="button"
              onClick={onClear}
              className="text-[10px] text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className={cn("p-1.5 space-y-0.5", scrollable && "max-h-56 overflow-y-auto")}>
          {items.map(({ value, label: itemLabel, color }) => {
            const checked = selected.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => onToggle(value)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                  checked ? "bg-muted" : "hover:bg-muted/60"
                )}
              >
                <span className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                  checked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background"
                )}>
                  {checked && <Check className="size-2.5" strokeWidth={3} />}
                </span>
                {color && (
                  <span className={cn("size-2 shrink-0 rounded-full", color)} style={{ display: "inline-block" }} />
                )}
                <span className="text-foreground">{itemLabel}</span>
              </button>
            );
          })}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

// ---------------------------------------------------------------------------
// VerifiedToggle — simple single-toggle dropdown
// ---------------------------------------------------------------------------

function VerifiedToggle({
  checked, onToggle, label,
}: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors",
              checked
                ? "border-green-400/50 bg-green-500/10 text-green-700 dark:text-green-400"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          />
        }
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
        {label}
        <ChevronDown className="size-3 opacity-60" />
      </Popover.Trigger>

      <Popover.Content className="w-44">
        <div className="p-1.5">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-muted/60"
            )}
          >
            <span className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
              checked
                ? "border-green-500 bg-green-500 text-white"
                : "border-border bg-background"
            )}>
              {checked && <Check className="size-2.5" strokeWidth={3} />}
            </span>
            <span className="text-foreground">{label}</span>
          </button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

// ---------------------------------------------------------------------------
// MapFilterPanel
// ---------------------------------------------------------------------------

export function MapFilterPanel({
  filters, onChange, totalCount, filteredCount,
}: MapFilterPanelProps) {
  const { t, lang } = useLanguage();
  const f = t.filters;

  const toggleCategory = (cat: ReportCategoryType) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  };

  const toggleSeverity = (sev: SeverityType) => {
    const next = filters.severities.includes(sev)
      ? filters.severities.filter((s) => s !== sev)
      : [...filters.severities, sev];
    onChange({ ...filters, severities: next });
  };

  const toggleDistrict = (d: string) => {
    const next = filters.districts.includes(d)
      ? filters.districts.filter((x) => x !== d)
      : [...filters.districts, d];
    onChange({ ...filters, districts: next });
  };

  const clearAll = () =>
    onChange({ categories: [], severities: [], statuses: [], districts: [], verifiedOnly: false, searchQuery: "" });

  const activeCount =
    filters.categories.length +
    filters.severities.length +
    filters.districts.length +
    (filters.verifiedOnly ? 1 : 0);

  const categoryItems = (Object.values(ReportCategory) as ReportCategoryType[]).map((cat) => ({
    value: cat,
    label: t.category[cat],
    color: CATEGORY_COLORS[cat].split(" ")[0],
  }));

  const severityItems = (Object.values(Severity) as SeverityType[]).map((sev) => ({
    value: sev,
    label: t.severity[sev],
    color: SEVERITY_COLORS[sev].split(" ")[0],
  }));

  const districtItems = DISTRICTS.map((d) => ({
    value: d.en,
    label: lang === "bn" ? d.bn : d.en,
  }))

  return (
    <div className="z-[999] flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur-sm">
      {/* Left: filter icon + dropdowns */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground pr-1">
          <SlidersHorizontal className="size-3.5" />
          <span className="font-medium">{f.filtersLabel}</span>
        </span>

        <FilterDropdown
          label={f.category}
          activeCount={filters.categories.length}
          items={categoryItems}
          selected={filters.categories}
          onToggle={toggleCategory}
          onClear={() => onChange({ ...filters, categories: [] })}
        />

        <FilterDropdown
          label={f.severity}
          activeCount={filters.severities.length}
          items={severityItems}
          selected={filters.severities}
          onToggle={toggleSeverity}
          onClear={() => onChange({ ...filters, severities: [] })}
        />

        <FilterDropdown
          label={f.district}
          activeCount={filters.districts.length}
          items={districtItems}
          selected={filters.districts}
          onToggle={toggleDistrict}
          onClear={() => onChange({ ...filters, districts: [] })}
          scrollable
        />

        <VerifiedToggle
          checked={filters.verifiedOnly}
          onToggle={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          label={f.verification}
        />

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="size-3" /> {f.clearAll}
          </button>
        )}
      </div>

      {/* Right: report count */}
      <div className="ml-auto shrink-0">
        <span className="text-xs text-muted-foreground tabular-nums">
          {f.ofReports(filteredCount, totalCount)}
        </span>
      </div>
    </div>
  );
}
