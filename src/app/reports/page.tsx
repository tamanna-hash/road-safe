import type { Metadata } from "next";
import { ReportListView } from "@/components/reports/report-list-view";

export const metadata: Metadata = {
  title: "All Reports",
  description:
    "Browse all community-submitted road safety reports. Search and filter by status, severity, and category.",
};

/**
 * Reports list page — browsable view of all submitted reports.
 * Server Component shell; ReportListView is the Client Component.
 */
export default function ReportsPage() {
  return <ReportListView />;
}
