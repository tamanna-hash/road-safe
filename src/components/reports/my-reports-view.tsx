"use client";

/**
 * MyReportsView — My Reports page client component.
 *
 * Displays the demo user's submitted reports with expandable cards
 * and a visual status timeline.
 *
 * NOTE: This uses a simulated demo identity. There is no real user
 * authentication in this frontend demonstration. All reports submitted
 * from this browser session are attributed to "Demo Reporter".
 */

import Link from "next/link";
import { ClipboardList, AlertTriangle, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MyReportCard } from "@/components/reports/my-report-card";
import { useMyReports } from "@/hooks/use-reports";
import { DEMO_USER_NAME } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">No reports yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reports you submit will appear here with their current status.
        </p>
      </div>
      <Button
        size="sm"
        render={<Link href="/report" />}
        className="gap-1.5"
      >
        <AlertTriangle className="size-3.5" />
        Submit your first report
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function MyReportsView() {
  const { myReports, isLoading } = useMyReports();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/40">
            <ClipboardList className="size-5 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">My Reports</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Track the progress of your submitted road safety reports.
        </p>
      </div>

      {/* Demo identity notice */}
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-300">
        <User className="mt-0.5 size-4 shrink-0" />
        <div>
          <strong>Demo identity: </strong>
          Showing reports attributed to{" "}
          <span className="font-semibold">{DEMO_USER_NAME}</span>. This is a
          simulated identity — there is no real user authentication in this
          frontend demonstration. Any report submitted from this browser appears
          here.
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-5 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/explore" />}
          className="gap-1.5"
        >
          <MapPin className="size-3.5" />
          View on map
        </Button>
        <Button
          size="sm"
          render={<Link href="/report" />}
          className="gap-1.5"
        >
          <AlertTriangle className="size-3.5" />
          Report new issue
        </Button>
      </div>

      {/* Report list */}
      {isLoading ? (
        <ListSkeleton />
      ) : myReports.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {myReports.length} report{myReports.length !== 1 ? "s" : ""} found.
            Click any card to expand details and track progress.
          </p>
          {myReports.map((report) => (
            <MyReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
