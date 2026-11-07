"use client";

import Link from "next/link";
import { ClipboardList, AlertTriangle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MyReportCard } from "@/components/reports/my-report-card";
import { PageHeader } from "@/components/shared/page-header";
import { DemoNotice } from "@/components/shared/demo-notice";
import { Footer } from "@/components/shared/footer";
import { useMyReports } from "@/hooks/use-reports";
import { useLanguage } from "@/lib/i18n/language-context";

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>
  );
}

function EmptyState() {
  const { t } = useLanguage();
  const e = t.myReports.empty;
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-muted">
        <ClipboardList className="size-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{e.title}</p>
        <p className="mt-1.5 text-sm text-muted-foreground max-w-xs mx-auto">{e.desc}</p>
      </div>
      <Button size="sm" nativeButton={false} render={<Link href="/report" />} className="gap-1.5">
        <AlertTriangle className="size-3.5" />
        {e.cta}
      </Button>
    </div>
  );
}

export function MyReportsView() {
  const { myReports, isLoading } = useMyReports();
  const { t } = useLanguage();

  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <PageHeader
          icon={<ClipboardList className="size-5" />}
          iconColor="bg-green-500/10 text-green-600 dark:text-green-400"
          title={t.myReports.pageTitle}
          description={t.myReports.pageDesc}
          action={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" nativeButton={false} render={<Link href="/explore" />} className="gap-1.5">
                <MapPin className="size-3.5" />
                <span className="hidden sm:inline">{t.myReports.viewOnMap}</span>
                <span className="sm:hidden">{t.common.map}</span>
              </Button>
              <Button size="sm" nativeButton={false} render={<Link href="/report" />} className="gap-1.5">
                <AlertTriangle className="size-3.5" />
                <span className="hidden sm:inline">{t.myReports.newReport}</span>
                <span className="sm:hidden">{t.common.report}</span>
              </Button>
            </div>
          }
        />
        <DemoNotice className="mt-6" compact message={t.app.demoIdentity("Demo User")} />
        <div className="mt-5">
          {isLoading ? <ListSkeleton /> : myReports.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">{t.myReports.count(myReports.length)}</p>
              {myReports.map((report) => <MyReportCard key={report.id} report={report} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
