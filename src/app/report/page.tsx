import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { ReportForm } from "@/components/reports/report-form";

export const metadata: Metadata = {
  title: "Report an Issue",
  description:
    "Submit a road safety issue report. Describe the hazard, pick a location on the map, and help make roads safer.",
};

/**
 * Report Issue page — road safety report submission.
 *
 * This is a Server Component. The form itself is a Client Component
 * since it requires React Hook Form, browser geolocation, and Leaflet.
 */
export default function ReportPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/40">
            <AlertTriangle className="size-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Report a Road Safety Issue
          </h1>
        </div>
        <p className="text-muted-foreground">
          Spotted a dangerous road condition? Fill in the form below to submit a
          community report. Your report will appear on the map with a{" "}
          <span className="font-medium text-foreground">Pending</span> status
          while it awaits review.
        </p>
      </div>

      {/* Form */}
      <ReportForm />
    </div>
  );
}
