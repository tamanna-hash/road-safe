"use client";

import {
  MapPin, Calendar, Clock, User,
  AlertTriangle, CheckCircle2, ArrowUpCircle, XCircle,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, SeverityBadge, CategoryBadge, VerifiedIndicator } from "@/components/shared/badges";
import { useLocalizedReport } from "@/hooks/use-localized-report";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import { STATUS_DESCRIPTIONS } from "@/lib/constants";
import type { Report } from "@/types";

function formatDate(iso: string, lang: string): string {
  const locale = lang === "bn" ? "bn-BD" : "en-GB";
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric", month: "short", year: "numeric",
  });
}

function StatusIcon({ status }: { status: Report["status"] }) {
  const base = "size-4 shrink-0";
  switch (status) {
    case "PENDING":     return <Clock className={cn(base, "text-gray-400")} />;
    case "VERIFIED":    return <CheckCircle2 className={cn(base, "text-blue-500")} />;
    case "IN_PROGRESS": return <ArrowUpCircle className={cn(base, "text-yellow-500")} />;
    case "RESOLVED":    return <CheckCircle2 className={cn(base, "text-green-500")} />;
    case "REJECTED":    return <XCircle className={cn(base, "text-red-400")} />;
  }
}

interface ReportDetailDialogProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}

export function ReportDetailDialog({ report, open, onClose }: ReportDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg w-full p-0 overflow-hidden max-h-[90vh] flex flex-col" showCloseButton>
        {report ? <DetailContent report={report} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function DetailContent({ report }: { report: Report }) {
  const { lang, t } = useLanguage();
  const { title, description, address, adminNote } = useLocalizedReport(report);
  const rc = t.reportCard;

  return (
    <>
      <DialogHeader className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <VerifiedIndicator status={report.status} showLabel />
        </div>
        <DialogTitle className="text-base font-semibold leading-snug pr-6">{title}</DialogTitle>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <StatusBadge status={report.status} />
          <SeverityBadge severity={report.severity} />
          <CategoryBadge category={report.category} />
        </div>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto">
        {/* Status explanation */}
        <div className="px-5 py-4">
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <StatusIcon status={report.status} />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t.status.descriptions[report.status]}
            </p>
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="px-5 py-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="size-3.5" /> {rc.location}
          </h3>
          <p className="text-sm text-foreground">{address ?? rc.coordinatesOnly}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {report.location.lat.toFixed(5)}, {report.location.lng.toFixed(5)}
          </p>
        </div>

        <Separator />

        {/* Description */}
        <div className="px-5 py-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <AlertTriangle className="size-3.5" /> {rc.description}
          </h3>
          <p className="text-sm leading-relaxed text-foreground">{description}</p>
        </div>

        {/* Image */}
        {report.imageUrl && (
          <>
            <Separator />
            <div className="px-5 py-4">
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
            <div className="px-5 py-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{rc.adminNote}</h3>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
                <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">{adminNote}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Meta */}
        <div className="px-5 py-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" />
            {rc.submittedOn} {formatDate(report.submittedAt, lang)}
          </div>
          {report.updatedAt && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              {rc.updatedOn} {formatDate(report.updatedAt, lang)}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="size-3.5 shrink-0" />
            {rc.demoReporter}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mx-5 mb-5 rounded-lg bg-muted/50 p-3">
          <p className="text-[10px] text-muted-foreground italic">
            {rc.sampleData} · {rc.reportId}: {report.id}
          </p>
        </div>
      </div>

      <DialogFooter showCloseButton className="shrink-0" />
    </>
  );
}
