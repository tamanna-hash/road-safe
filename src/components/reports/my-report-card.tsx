"use client";

/**
 * MyReportCard — expandable card for the My Reports page.
 * Shows a summary row and expands to reveal the StatusTimeline,
 * full description, location, admin note, and submission dates.
 */

import { useState } from "react";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, SeverityBadge, CategoryBadge } from "@/components/shared/badges";
import { StatusTimeline } from "@/components/reports/status-timeline";
import { cn } from "@/lib/utils";
import type { Report } from "@/types";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

interface MyReportCardProps {
  report: Report;
}

export function MyReportCard({ report }: MyReportCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={cn("transition-shadow", expanded && "shadow-md")}>
      {/* Summary row — always visible */}
      <CardContent className="p-4">
        <button
          type="button"
          className="w-full text-left"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground leading-snug line-clamp-2">
                {report.title}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <StatusBadge status={report.status} />
                <SeverityBadge severity={report.severity} />
                <CategoryBadge category={report.category} />
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {report.location.address && (
                  <span className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="size-3 shrink-0" />
                    <span className="truncate">{report.location.address}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 shrink-0" />
                  {fmtDate(report.submittedAt)}
                </span>
              </div>
            </div>
            <div className="shrink-0 text-muted-foreground mt-0.5">
              {expanded
                ? <ChevronUp className="size-4" />
                : <ChevronDown className="size-4" />}
            </div>
          </div>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 space-y-4">
            <Separator />

            {/* Status timeline */}
            <StatusTimeline report={report} />

            <Separator />

            {/* Description */}
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                {report.description}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </p>
              <p className="text-sm text-foreground">
                {report.location.address ?? "Coordinates only"}
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {report.location.lat.toFixed(5)}, {report.location.lng.toFixed(5)}
              </p>
            </div>

            {/* Admin note */}
            {report.adminNote && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1">
                  Admin Note
                </p>
                <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">
                  {report.adminNote}
                </p>
              </div>
            )}

            {/* Photo */}
            {report.imageUrl && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Photo
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={report.imageUrl}
                  alt="Report photo"
                  className="w-full rounded-lg object-cover max-h-48"
                />
              </div>
            )}

            {/* Meta */}
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="size-3.5 shrink-0" />
                Submitted {fmtDate(report.submittedAt)}
              </div>
              {report.updatedAt && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 shrink-0" />
                  Last updated {fmtDate(report.updatedAt)}
                </div>
              )}
              <p className="text-[10px] text-muted-foreground italic font-mono">
                ID: {report.id}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
