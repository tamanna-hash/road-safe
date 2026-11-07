"use client";

import { useState, useMemo } from "react";
import { MapPin, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportCard } from "@/components/reports/report-card";
import { ReportDetailDialog } from "@/components/reports/report-detail-dialog";
import { ReportListControls } from "@/components/reports/report-list-controls";
import { PageHeader } from "@/components/shared/page-header";
import { DemoNotice } from "@/components/shared/demo-notice";
import { useReports, useReportFilters } from "@/hooks/use-reports";
import { filterReports } from "@/lib/reports";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Report } from "@/types";

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-2xl" />
      ))}
    </div>
  );
}

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  const { t } = useLanguage();
  const r = t.reportList.empty;
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
        <FileText className="size-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {hasFilters ? r.filterTitle : r.emptyTitle}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-xs mx-auto">
          {hasFilters ? r.filterDesc : r.emptyDesc}
        </p>
      </div>
      {hasFilters ? (
        <Button variant="outline" size="sm" onClick={onClear}>{r.clearFilters}</Button>
      ) : (
        <Button size="sm" nativeButton={false} render={<Link href="/report" />} className="gap-1.5">
          <AlertTriangle className="size-3.5" />
          {r.submitReport}
        </Button>
      )}
    </div>
  );
}

export function ReportListView() {
  const { reports, isLoading } = useReports();
  const { filters, setFilters, clearFilters, hasActiveFilters } = useReportFilters();
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredReports = useMemo(
    () => filterReports(reports, filters),
    [reports, filters]
  );

  const handleCardClick = (report: Report) => { setSelectedReport(report); setDialogOpen(true); };
  const handleDialogClose = () => { setDialogOpen(false); setTimeout(() => setSelectedReport(null), 300); };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        icon={<FileText className="size-5" />}
        title={t.reportList.pageTitle}
        description={t.reportList.pageDesc}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/explore" />} className="gap-1.5">
              <MapPin className="size-3.5" />
              <span className="hidden sm:inline">{t.reportList.viewOnMap}</span>
              <span className="sm:hidden">{t.common.map}</span>
            </Button>
            <Button size="sm" nativeButton={false} render={<Link href="/report" />} className="gap-1.5">
              <AlertTriangle className="size-3.5" />
              <span className="hidden sm:inline">{t.reportList.reportIssue}</span>
              <span className="sm:hidden">{t.common.report}</span>
            </Button>
          </div>
        }
      />
      <DemoNotice className="mt-6" compact />
      <div className="mt-5 rounded-2xl border border-border/70 bg-card p-4">
        <ReportListControls filters={filters} onChange={setFilters} totalCount={reports.length} filteredCount={filteredReports.length} />
      </div>
      <div className="mt-4">
        {isLoading ? <ListSkeleton /> : filteredReports.length === 0 ? (
          <EmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} onClick={handleCardClick} isSelected={selectedReport?.id === report.id} />
            ))}
          </div>
        )}
      </div>
      <ReportDetailDialog report={selectedReport} open={dialogOpen} onClose={handleDialogClose} />
    </div>
  );
}
