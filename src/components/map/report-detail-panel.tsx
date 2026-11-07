"use client";

import { X, MapPin, Calendar, User, AlertTriangle, CheckCircle2, Clock, XCircle, ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, SeverityBadge, CategoryBadge, VerifiedIndicator } from "@/components/shared/badges";
import { useLocalizedReport } from "@/hooks/use-localized-report";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import type { Report } from "@/types";

interface ReportDetailPanelProps {
  report: Report | null;
  onClose: () => void;
}

function StatusIcon({ status }: { status: Report["status"] }) {
  const props = { className: "size-4 shrink-0" };
  switch (status) {
    case "PENDING":     return <Clock     {...props} className={cn(props.className, "text-gray-400")} />;
    case "VERIFIED":    return <CheckCircle2 {...props} className={cn(props.className, "text-blue-500")} />;
    case "IN_PROGRESS": return <ArrowUpCircle {...props} className={cn(props.className, "text-yellow-500")} />;
    case "RESOLVED":    return <CheckCircle2 {...props} className={cn(props.className, "text-green-500")} />;
    case "REJECTED":    return <XCircle   {...props} className={cn(props.className, "text-red-400")} />;
  }
}

function formatDate(iso: string, lang: string): string {
  const locale = lang === "bn" ? "bn-BD" : "en-GB";
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function ReportDetailPanel({ report, onClose }: ReportDetailPanelProps) {
  const isOpen = report !== null;
  return (
    <>
      {isOpen && (
        <div className="absolute inset-0 z-[900] bg-black/30 md:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <div
        className={cn(
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

function PanelContent({ report, onClose }: { report: Report; onClose: () => void }) {
  const { lang, t } = useLanguage();
  const { title, description, address, adminNote } = useLocalizedReport(report);
  const rc = t.reportCard;

  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-border p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <VerifiedIndicator status={report.status} showLabel />
          </div>
          <h2 className="text-sm font-semibold text-foreground leading-snug">{title}</h2>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t.common.close} className="shrink-0">
          <X className="size-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Badges */}
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
              {t.status.descriptions[report.status]}
            </p>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="size-3.5" /> {rc.location}
          </h3>
          <p className="text-sm text-foreground">{address ?? rc.coordinatesOnly}</p>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            {report.location.lat.toFixed(5)}, {report.location.lng.toFixed(5)}
          </p>
        </div>

        <Separator />

        {/* Description */}
        <div className="p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <AlertTriangle className="size-3.5" /> {rc.description}
          </h3>
          <p className="text-sm leading-relaxed text-foreground">{description}</p>
        </div>

        {/* Image */}
        {report.imageUrl && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{rc.photo}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={report.imageUrl} alt="Report photo" className="w-full rounded-lg object-cover max-h-48" />
            </div>
          </>
        )}

        {/* Admin note */}
        {adminNote && (
          <>
            <Separator />
            <div className="p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{rc.adminNote}</h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
                <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">{adminNote}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Meta */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" />
            <span>{rc.submittedOn} {formatDate(report.submittedAt, lang)}</span>
          </div>
          {report.updatedAt && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span>{rc.updatedOn} {formatDate(report.updatedAt, lang)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="size-3.5 shrink-0" />
            <span>{rc.demoReporter}</span>
          </div>
        </div>

        {/* Demo disclaimer */}
        <div className="mx-4 mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] leading-relaxed text-muted-foreground italic">
            {rc.sampleData} · {rc.reportId}: {report.id}
          </p>
        </div>
      </div>
    </>
  );
}
