"use client";

/**
 * ReportDetailPanel — slide-in side panel shown when a map marker is selected.
 * Displays full report information including status, category, severity, location,
 * description, and any admin notes.
 */

import { X, MapPin, Calendar, User, AlertTriangle, CheckCircle2, Clock, XCircle, ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, SeverityBadge, CategoryBadge, VerifiedIndicator } from "@/components/shared/badges";
import { cn } from "@/lib/utils";
import { STATUS_DESCRIPTIONS } from "@/lib/constants";
import type { Report } from "@/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ReportDetailPanelProps {
  report: Report | null;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Status icon helper
// ---------------------------------------------------------------------------

function StatusIcon({ status }: { status: Report["status"] }) {
  const props = { className: "size-4 shrink-0" };
  switch (status) {
    case "PENDING":      return <Clock {...props} className={cn(props.className, "text-gray-400")} />;
    case "VERIFIED":     return <CheckCircle2 {...props} className={cn(props.className, "text-blue-500")} />;
    case "IN_PROGRESS":  return <ArrowUpCircle {...props} className={cn(props.className, "text-yellow-500")} />;
    case "RESOLVED":     return <CheckCircle2 {...props} className={cn(props.className, "text-green-500")} />;
    case "REJECTED":     return <XCircle {...props} className={cn(props.className, "text-red-400")} />;
  }
}

// ---------------------------------------------------------------------------
// Date formatting helper
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReportDetailPanel({ report, onClose }: ReportDetailPanelProps) {
  const isOpen = report !== null;

  return (
    <>
      {/* Backdrop — only on mobile */}
      {isOpen && (
        <div
          className="absolute inset-0 z-[900] bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          // Positioning — sits over the map on the right side
          "absolute right-0 top-0 z-[1000] flex h-full w-full flex-col bg-background shadow-xl transition-transform duration-300 ease-in-out",
          "md:w-[360px] lg:w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="complementary"
        aria-label="Report details"
      >
        {report ? <PanelContent report={report} onClose={onClose} /> : null}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Panel content (rendered only when a report is selected)
// ---------------------------------------------------------------------------

function PanelContent({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-border p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <VerifiedIndicator status={report.status} showLabel />
          </div>
          <h2 className="text-sm font-semibold text-foreground leading-snug">
            {report.title}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close panel"
          className="shrink-0"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Badges row */}
        <div className="flex flex-wrap gap-2 p-4 pb-3">
          <StatusBadge status={report.status} />
          <SeverityBadge severity={report.severity} />
          <CategoryBadge category={report.category} />
        </div>

        <Separator />

        {/* Status description */}
        <div className="p-4">
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <StatusIcon status={report.status} />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {STATUS_DESCRIPTIONS[report.status]}
            </p>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="size-3.5" />
            Location
          </h3>
          <p className="text-sm text-foreground">
            {report.location.address ?? "Location coordinates only"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            {report.location.lat.toFixed(5)}, {report.location.lng.toFixed(5)}
          </p>
        </div>

        <Separator />

        {/* Description */}
        <div className="p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <AlertTriangle className="size-3.5" />
            Description
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            {report.description}
          </p>
        </div>

        {/* Image (if present) */}
        {report.imageUrl && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Photo
              </h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={report.imageUrl}
                alt="Report photo"
                className="w-full rounded-lg object-cover max-h-48"
              />
            </div>
          </>
        )}

        {/* Admin note (if present) */}
        {report.adminNote && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Admin Note
              </h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
                <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">
                  {report.adminNote}
                </p>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Meta — submitted by / dates */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" />
            <span>Submitted {formatDate(report.submittedAt)}</span>
          </div>
          {report.updatedAt && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span>Last updated {formatDate(report.updatedAt)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="size-3.5 shrink-0" />
            <span>Demo Reporter (simulated identity)</span>
          </div>
        </div>

        {/* Demo disclaimer */}
        <div className="mx-4 mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] leading-relaxed text-muted-foreground italic">
            Sample data — not official statistics. Report ID: {report.id}
          </p>
        </div>
      </div>
    </>
  );
}
