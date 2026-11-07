"use client";

import { Check, ChevronDown, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SEVERITY_COLORS, STATUS_COLORS, DISTRICTS } from "@/lib/constants";
import {
  ReportStatus, Severity,
  type ReportFilters,
  type ReportStatus as ReportStatusType,
  type Severity as SeverityType,
} from "@/types";
import { useLanguage } from "@/lib/i18n/language-context";

interface ReportListControlsProps {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
  totalCount: number;
  filteredCount: number;
}

// ---------------------------------------------------------------------------
// Generic multi-select dropdown
// ---------------------------------------------------------------------------

interface FilterDropdownProps<T extends string> {
  label: string;
  activeCount: number;
  items: { value: T; label: string; colorClass: string }[];
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
            <button type="button" onClick={onClear} className="text-[10px] text-primary hover:underline">
              Clear
            </button>
          )}
        </div>
        <div className={cn("p-1.5 space-y-0.5", scrollable && "max-h-56 overflow-y-auto")}>
          {items.map(({ value, label: itemLabel, colorClass }) => {
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
                  checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
                )}>
                  {checked && <Check className="size-2.5" strokeWidth={3} />}
                </span>
                {colorClass ? (
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none", colorClass)}>
                    {itemLabel}
                  </span>
                ) : (
                  <span className="text-foreground">{itemLabel}</span>
                )}
              </button>
            );
          })}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

// ---------------------------------------------------------------------------
// ReportListControls
// ---------------------------------------------------------------------------

export function ReportListControls({
  filters, onChange, totalCount, filteredCount,
}: ReportListControlsProps) {
  const { t, lang } = useLanguage();

  const toggleStatus = (s: ReportStatusType) => {
    const next = filters.statuses.includes(s) ? filters.statuses.filter((x) => x !== s) : [...filters.statuses, s];
    onChange({ ...filters, statuses: next });
  };
  const toggleSeverity = (s: SeverityType) => {
    const next = filters.severities.includes(s) ? filters.severities.filter((x) => x !== s) : [...filters.severities, s];
    onChange({ ...filters, severities: next });
  };
  const toggleDistrict = (d: string) => {
    const next = filters.districts.includes(d) ? filters.districts.filter((x) => x !== d) : [...filters.districts, d];
    onChange({ ...filters, districts: next });
  };

  const hasFilters =
    filters.statuses.length > 0 || filters.severities.length > 0 ||
    filters.districts.length > 0 || filters.searchQuery.trim() !== "";

  const clearAll = () => onChange({ ...filters, statuses: [], severities: [], districts: [], searchQuery: "" });

  const statusItems = (Object.values(ReportStatus) as ReportStatusType[]).map((s) => ({
    value: s, label: t.status[s], colorClass: STATUS_COLORS[s],
  }));
  const severityItems = (Object.values(Severity) as SeverityType[]).map((s) => ({
    value: s, label: t.severity[s], colorClass: SEVERITY_COLORS[s],
  }));
  const districtItems = DISTRICTS.map((d) => ({
    value: d.en, label: lang === "bn" ? d.bn : d.en, colorClass: "",
  }));

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder={t.reportList.search.placeholder}
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="pl-8 pr-8"
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

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          label={t.reportList.statusFilter}
          activeCount={filters.statuses.length}
          items={statusItems}
          selected={filters.statuses}
          onToggle={toggleStatus}
          onClear={() => onChange({ ...filters, statuses: [] })}
        />

        <FilterDropdown
          label={t.reportList.severityFilter}
          activeCount={filters.severities.length}
          items={severityItems}
          selected={filters.severities}
          onToggle={toggleSeverity}
          onClear={() => onChange({ ...filters, severities: [] })}
        />

        <FilterDropdown
          label={t.filters.district}
          activeCount={filters.districts.length}
          items={districtItems}
          selected={filters.districts}
          onToggle={toggleDistrict}
          onClear={() => onChange({ ...filters, districts: [] })}
          scrollable
        />

        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="size-3" /> {t.filters.clearAllFilters}
          </button>
        )}

        {/* Result count */}
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {t.reportList.results(filteredCount, totalCount)}
        </span>
      </div>

      {/* Active filter summary chips */}
      {(filters.statuses.length > 0 || filters.severities.length > 0 || filters.districts.length > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {filters.statuses.map((s) => (
            <span key={s} className={cn("inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium", STATUS_COLORS[s])}>
              {t.status[s]}
              <button onClick={() => toggleStatus(s)} className="ml-0.5 opacity-60 hover:opacity-100" aria-label="Remove"><X className="size-2.5" /></button>
            </span>
          ))}
          {filters.severities.map((s) => (
            <span key={s} className={cn("inline-flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium", SEVERITY_COLORS[s])}>
              {t.severity[s]}
              <button onClick={() => toggleSeverity(s)} className="ml-0.5 opacity-60 hover:opacity-100" aria-label="Remove"><X className="size-2.5" /></button>
            </span>
          ))}
          {filters.districts.map((d) => (
            <span key={d} className="inline-flex h-6 items-center gap-1 rounded-full bg-primary/10 px-2 text-[11px] font-medium text-primary">
              {lang === "bn" ? (DISTRICTS.find((x) => x.en === d)?.bn ?? d) : d}
              <button onClick={() => toggleDistrict(d)} className="ml-0.5 opacity-60 hover:opacity-100" aria-label="Remove"><X className="size-2.5" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
