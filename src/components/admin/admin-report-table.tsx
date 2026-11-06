"use client";

/**
 * AdminReportTable — tabular view of reports for the admin dashboard.
 * Each row is expandable to reveal the StatusUpdateForm inline.
 */

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge, SeverityBadge, CategoryBadge } from "@/components/shared/badges";
import { StatusUpdateForm } from "@/components/admin/status-update-form";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface AdminReportTableProps {
  reports: Report[];
  onStatusChange: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onViewDetail: (report: Report) => void;
}

// ---------------------------------------------------------------------------
// Date formatter
// ---------------------------------------------------------------------------

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminReportTable({ reports, onStatusChange, onViewDetail }: AdminReportTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  if (reports.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        No reports in this category.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-[35%] pl-4">Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Severity</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden lg:table-cell">Submitted</TableHead>
            <TableHead className="text-right pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => {
            const isExpanded = expandedId === report.id;
            return (
              <React.Fragment key={report.id}>
                {/* Main row */}
                <TableRow
                  className={cn(isExpanded && "bg-muted/30 border-b-0")}
                >
                  <TableCell className="pl-4 max-w-[200px]">
                    <p className="font-medium text-sm text-foreground truncate">
                      {report.title}
                    </p>
                    {report.location.address && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {report.location.address}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={report.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <SeverityBadge severity={report.severity} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <CategoryBadge category={report.category} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {fmtDate(report.submittedAt)}
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onViewDetail(report)}
                        aria-label="View report details"
                        title="View details"
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => toggleExpand(report.id)}
                        aria-label={isExpanded ? "Collapse update form" : "Expand update form"}
                        title={isExpanded ? "Collapse" : "Update status"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-3.5" />
                        ) : (
                          <ChevronDown className="size-3.5" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded status update form */}
                {isExpanded && (
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={6} className="px-4 pb-4 pt-0">
                      <div className="max-w-sm pt-3">
                        <StatusUpdateForm
                          report={report}
                          onUpdate={(id, status, note) => {
                            onStatusChange(id, status, note);
                            setExpandedId(null);
                          }}
                          onCancel={() => setExpandedId(null)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
