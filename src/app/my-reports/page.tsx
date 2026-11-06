import type { Metadata } from "next";
import { MyReportsView } from "@/components/reports/my-reports-view";

export const metadata: Metadata = {
  title: "My Reports",
  description:
    "Track the progress of your submitted road safety reports. See status updates and admin notes.",
};

/**
 * My Reports page — personal report tracking with status timeline.
 *
 * NOTE: Uses a simulated demo identity. No real authentication.
 * All reports submitted from this browser are shown here.
 */
export default function MyReportsPage() {
  return <MyReportsView />;
}
