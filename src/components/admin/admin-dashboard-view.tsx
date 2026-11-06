"use client";

/**
 * AdminDashboardView — admin dashboard client component.
 *
 * IMPORTANT: This is a simulated administrative interface for frontend
 * demonstration only. There is no real authentication, no server-side
 * access control, and no real authority integration.
 * All changes persist only in the browser's localStorage.
 */

import { useState, useMemo } from "react";
import { Shield, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AdminStatsRow } from "@/components/admin/stat-card";
import { AdminReportTable } from "@/components/admin/admin-report-table";
import { ReportDetailDialog } from "@/components/reports/report-detail-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useReports } from "@/hooks/use-reports";
import { ReportStatus, type Report, type ReportStatus as ReportStatusType } from "@/types";
import { STATUS_LABELS } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab definitions — one tab per status + "All"
// ---------------------------------------------------------------------------

const TABS: { value: string; label: string; status?: ReportStatusType }[] = [
  { value: "all",        label: "All" },
  { value: "pending",    label: STATUS_LABELS[ReportStatus.PENDING],     status: ReportStatus.PENDING },
  { value: "verified",   label: STATUS_LABELS[ReportStatus.VERIFIED],    status: ReportStatus.VERIFIED },
  { value: "inprogress", label: STATUS_LABELS[ReportStatus.IN_PROGRESS], status: ReportStatus.IN_PROGRESS },
  { value: "resolved",   label: STATUS_LABELS[ReportStatus.RESOLVED],    status: ReportStatus.RESOLVED },
  { value: "rejected",   label: STATUS_LABELS[ReportStatus.REJECTED],    status: ReportStatus.REJECTED },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminDashboardView() {
  const { reports, stats, isLoading, updateStatus, reset } = useReports();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter reports by active tab
  const tabReports = useMemo(() => {
    const tab = TABS.find((t) => t.value === activeTab);
    if (!tab?.status) return reports;
    return reports.filter((r) => r.status === tab.status);
  }, [reports, activeTab]);

  const handleStatusChange = (
    reportId: string,
    newStatus: ReportStatusType,
    note?: string
  ) => {
    updateStatus(reportId, newStatus, note);
  };

  const handleViewDetail = (report: Report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
  };

  const handleReset = () => {
    if (window.confirm("Reset all data to the original sample reports? This cannot be undone.")) {
      reset();
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/40">
              <Shield className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Review and manage community road safety reports.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-1.5 shrink-0"
        >
          <RefreshCw className="size-3.5" />
          Reset demo data
        </Button>
      </div>

      {/* Simulated admin disclaimer */}
      <div className="mb-6 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-300">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <div>
          <strong>Demo only: </strong>
          This is a simulated admin interface. There is no real authentication or
          access control. Status changes persist only in your browser's localStorage.
        </div>
      </div>

      {/* Stats row */}
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6">
          <AdminStatsRow stats={stats} />

          {/* Report table with tabs */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="font-semibold text-foreground">Reports</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click the <strong>↓</strong> icon on any row to update its status.
                Click the <strong>eye</strong> icon to view full details.
              </p>
            </div>

            <div className="p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 flex-wrap h-auto gap-1 w-full justify-start">
                  {TABS.map((tab) => {
                    // Show count badge on each tab
                    const count = tab.status
                      ? reports.filter((r) => r.status === tab.status).length
                      : reports.length;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="gap-1.5 text-xs"
                      >
                        {tab.label}
                        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums">
                          {count}
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {/* Single content panel — table re-renders on tab switch */}
                {TABS.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <AdminReportTable
                      reports={tabReports}
                      onStatusChange={handleStatusChange}
                      onViewDetail={handleViewDetail}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      )}

      {/* Detail dialog */}
      <ReportDetailDialog
        report={selectedReport}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
}
