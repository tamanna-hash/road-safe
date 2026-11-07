"use client";

import { AlertTriangle } from "lucide-react";
import { ReportForm } from "@/components/reports/report-form";
import { PageHeader } from "@/components/shared/page-header";
import { DemoNotice } from "@/components/shared/demo-notice";
import { Footer } from "@/components/shared/footer";
import { useLanguage } from "@/lib/i18n/language-context";

export default function ReportPage() {
  const { t } = useLanguage();
  const r = t.reportForm;
  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <PageHeader
          icon={<AlertTriangle className="size-5" />}
          iconColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
          title={r.pageTitle}
          description={r.pageDesc}
        />
        <DemoNotice className="mt-6" compact />
        <div className="mt-8">
          <ReportForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
