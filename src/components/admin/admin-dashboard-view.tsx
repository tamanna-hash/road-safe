"use client";

import { useState, useMemo } from "react";
import { LayoutDashboard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminStatsRow } from "@/components/admin/stat-card";
import { AdminReportTable } from "@/components/admin/admin-report-table";
import { ReportDetailDialog } from "@/components/reports/report-detail-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared/page-header";
import { DemoNotice } from "@/components/shared/demo-notice";
import { Footer } from "@/components/shared/footer";
import { useReports } from "@/hooks/use-reports";
import { ReportStatus, type Report, type ReportStatus as ReportStatusType } from "@/types";
import { useLanguage } from "@/lib/i18n/language-context";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
}

const TABS: { value: string; label: (t: any) => string; status?: ReportStatusType }[] = [
  { value: "all",        label: (t) => t.admin.tabs.all },
  { value: "pending",    label: (t) => t.status.PENDING,     status: ReportStatus.PENDING },
  { value: "verified",   label: (t) => t.status.VERIFIED,    status: ReportStatus.VERIFIED },
  { value: "inprogress", label: (t) => t.status.IN_PROGRESS, status: ReportStatus.IN_PROGRESS },
  { value: "resolved",   label: (t) => t.status.RESOLVED,    status: ReportStatus.RESOLVED },
  { value: "rejected",   label: (t) => t.status.REJECTED,    status: ReportStatus.REJECTED },
];

export function AdminDashboardView() {
  const { reports, stats, isLoading, updateStatus, reset } = useReports();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const tabReports = useMemo(() => {
    const tab = TABS.find((tb) => tb.value === activeTab);
    if (!tab?.status) return reports;
    return reports.filter((r) => r.status === tab.status);
  }, [reports, activeTab]);

  const handleStatusChange = (id: string, newStatus: ReportStatusType, note?: string) => updateStatus(id, newStatus, note);
  const handleViewDetail = (report: Report) => { setSelectedReport(report); setDialogOpen(true); };
  const handleDialogClose = () => { setDialogOpen(false); setTimeout(() => setSelectedReport(null), 300); };
  const handleReset = () => {
    if (window.confirm(t.admin.resetConfirm)) reset();
  };

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <PageHeader
        icon={<LayoutDashboard className="size-5" />}
        iconColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        title={t.admin.pageTitle}
        description={t.admin.pageDesc}
        action={
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
            <RefreshCw className="size-3.5" />
            {t.admin.resetData}
          </Button>
        }
      />
      <DemoNotice className="mt-6" compact messageKey="admin" />
      {isLoading ? <DashboardSkeleton /> : (
        <div className="mt-6 space-y-6">
          <AdminStatsRow stats={stats} />
          <div className="rounded-2xl border border-border/70 bg-card overflow-hidden">
            <div className="border-b border-border/60 px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">{t.admin.tableTitle}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.admin.tableHint}</p>
            </div>
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 flex h-auto flex-wrap gap-1 bg-transparent p-0">
                  {TABS.map((tab) => {
                    const count = tab.status ? reports.filter((r) => r.status === tab.status).length : reports.length;
                    return (
                      <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium">
                        {tab.label(t)}
                        <span className="min-w-[18px] rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-center">{count}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {TABS.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <AdminReportTable reports={tabReports} onStatusChange={handleStatusChange} onViewDetail={handleViewDetail} />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      )}
      <ReportDetailDialog report={selectedReport} open={dialogOpen} onClose={handleDialogClose} />
      </div>
      <Footer />
    </>
  );
}
