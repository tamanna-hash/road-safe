/**
 * Shared badge components for RoadSafe.
 *
 * StatusBadge, SeverityBadge, and CategoryBadge are used consistently
 * across the map popup, report cards, admin table, and detail panels.
 */

import { cn } from "@/lib/utils";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  SEVERITY_COLORS,
  SEVERITY_LABELS,
  STATUS_COLORS,
  STATUS_LABELS,
} from "@/lib/constants";
import type {
  ReportCategory,
  ReportStatus,
  Severity,
} from "@/types";

// ---------------------------------------------------------------------------
// Base badge — thin wrapper around a styled span
// ---------------------------------------------------------------------------

function BaseBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

export function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <BaseBadge className={STATUS_COLORS[status]}>
      {STATUS_LABELS[status]}
    </BaseBadge>
  );
}

// ---------------------------------------------------------------------------
// SeverityBadge
// ---------------------------------------------------------------------------

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <BaseBadge className={SEVERITY_COLORS[severity]}>
      {SEVERITY_LABELS[severity]}
    </BaseBadge>
  );
}

// ---------------------------------------------------------------------------
// CategoryBadge
// ---------------------------------------------------------------------------

export function CategoryBadge({ category }: { category: ReportCategory }) {
  return (
    <BaseBadge className={CATEGORY_COLORS[category]}>
      {CATEGORY_LABELS[category]}
    </BaseBadge>
  );
}

// ---------------------------------------------------------------------------
// VerifiedIndicator — small dot shown on verified/in-progress/resolved reports
// ---------------------------------------------------------------------------

export function VerifiedIndicator({
  status,
  showLabel = false,
}: {
  status: ReportStatus;
  showLabel?: boolean;
}) {
  const isVerified = status === "VERIFIED" || status === "IN_PROGRESS" || status === "RESOLVED";
  const isRejected = status === "REJECTED";

  const dotColor = isVerified
    ? "bg-green-500"
    : isRejected
    ? "bg-red-400"
    : "bg-gray-400";

  const label = isVerified ? "Verified" : isRejected ? "Rejected" : "Unverified";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", dotColor)} />
      {showLabel && (
        <span className="text-xs text-muted-foreground">{label}</span>
      )}
    </span>
  );
}
