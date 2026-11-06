"use client";

/**
 * ReportCard — compact card displayed in the report list.
 * Shows the key report info at a glance with badges and a click handler.
 */

import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, SeverityBadge, CategoryBadge, VerifiedIndicator } from "@/components/shared/badges";
import { cn } from "@/lib/utils";
import type { Report } from "@/types";

interface ReportCardProps {
  report: Report;
  onClick: (report: Report) => void;
  isSelected?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ReportCard({ report, onClick, isSelected }: ReportCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={() => onClick(report)}
      onKeyDown={(e) => e.key === "Enter" && onClick(report)}
      className={cn(
        "cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <CardContent className="p-4">
        {/* Top row — verified indicator + title + chevron */}
        <div className="flex items-start gap-2">
          <VerifiedIndicator status={report.status} />
          <p className="flex-1 font-medium text-sm text-foreground leading-snug line-clamp-2">
            {report.title}
          </p>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground mt-0.5" />
        </div>

        {/* Badge row */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          <StatusBadge status={report.status} />
          <SeverityBadge severity={report.severity} />
          <CategoryBadge category={report.category} />
        </div>

        {/* Location + date */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {report.location.address && (
            <span className="flex items-center gap-1 truncate max-w-[200px]">
              <MapPin className="size-3 shrink-0" />
              <span className="truncate">{report.location.address}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="size-3 shrink-0" />
            {formatDate(report.submittedAt)}
          </span>
        </div>

        {/* Admin note snippet */}
        {report.adminNote && (
          <p className="mt-2 text-xs text-muted-foreground italic line-clamp-1 border-l-2 border-border pl-2">
            {report.adminNote}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
