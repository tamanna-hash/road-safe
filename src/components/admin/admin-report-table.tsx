"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge, SeverityBadge, CategoryBadge } from "@/components/shared/badges";
import { StatusUpdateForm } from "@/components/admin/status-update-form";
import { useLocalizedReport } from "@/hooks/use-localized-report";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import type { Report, ReportStatus } from "@/types";

interface AdminReportTableProps {
  reports: Report[];
  onStatusChange: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onViewDetail: (report: Report) => void;
}

function fmtDate(iso: string, lang: string) {
  const locale = lang === "bn" ? "bn-BD" : "en-GB";
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric", month: "short", year: "numeric",
  });
}

// Row is its own component so it can call hooks per-row
function ReportRow({
  report, isExpanded, onToggle, onStatusChange, onViewDetail,
}: {
  report: Report;
  isExpanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: ReportStatus, note?: string) => void;
  onViewDetail: (r: Report) => void;
}) {
  const { lang, t } = useLanguage();
  const { title, address } = useLocalizedReport(report);

  return (
    <React.Fragment>
      <TableRow className={cn(isExpanded && "bg-muted/30 border-b-0")}>
        <TableCell className="pl-4 max-w-[200px]">
          <p className="font-medium text-sm text-foreground truncate">{title}</p>
          {address && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{address}</p>
          )}
        </TableCell>
        <TableCell><StatusBadge status={report.status} /></TableCell>
        <TableCell className="hidden sm:table-cell"><SeverityBadge severity={report.severity} /></TableCell>
        <TableCell className="hidden md:table-cell"><CategoryBadge category={report.category} /></TableCell>
        <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
          {fmtDate(report.submittedAt, lang)}
        </TableCell>
        <TableCell className="pr-4">
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost" size="icon-sm"
              onClick={() => onViewDetail(report)}
              aria-label={t.admin.viewDetails}
              title={t.admin.viewDetails}
            >
              <Eye className="size-3.5" />
            </Button>
            <Button
              variant="ghost" size="icon-sm"
              onClick={onToggle}
              aria-label={isExpanded ? t.admin.collapseRow : t.admin.expandRow}
              title={isExpanded ? t.admin.collapseRow : t.admin.expandRow}
            >
              {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="bg-muted/20 hover:bg-muted/20">
          <TableCell colSpan={6} className="px-4 pb-4 pt-0">
            <div className="max-w-sm pt-3">
              <StatusUpdateForm
                report={report}
                onUpdate={(id, status, note) => { onStatusChange(id, status, note); }}
                onCancel={onToggle}
              />
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export function AdminReportTable({ reports, onStatusChange, onViewDetail }: AdminReportTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);
  const { t } = useLanguage();

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const visibleReports = reports.slice(0, visibleCount);
  const hasMore = visibleCount < reports.length;
  const remaining = reports.length - visibleCount;

  if (reports.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        {t.explore.emptyState.title}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[35%] pl-4">{t.nav.reports}</TableHead>
              <TableHead>{t.reportList.statusFilter}</TableHead>
              <TableHead className="hidden sm:table-cell">{t.reportList.severityFilter}</TableHead>
              <TableHead className="hidden md:table-cell">{t.filters.category}</TableHead>
              <TableHead className="hidden lg:table-cell">{t.reportCard.submittedOn}</TableHead>
              <TableHead className="text-right pr-4">{t.admin.viewDetails}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleReports.map((report) => (
              <ReportRow
                key={report.id}
                report={report}
                isExpanded={expandedId === report.id}
                onToggle={() => toggleExpand(report.id)}
                onStatusChange={(id, status, note) => {
                  onStatusChange(id, status, note);
                  setExpandedId(null);
                }}
                onViewDetail={onViewDetail}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Show more / Show less footer */}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span>
          Showing {visibleReports.length} of {reports.length} reports
        </span>
        <div className="flex gap-2">
          {hasMore && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibleCount((c) => c + 15)}
              className="gap-1.5 text-xs h-8"
            >
              <ChevronDown className="size-3.5" />
              Show {Math.min(remaining, 15)} more
            </Button>
          )}
          {visibleCount > 15 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setVisibleCount(15); setExpandedId(null); }}
              className="gap-1.5 text-xs h-8 text-muted-foreground"
            >
              <ChevronUp className="size-3.5" />
              Show less
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
