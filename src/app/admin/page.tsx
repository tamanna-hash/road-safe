import type { Metadata } from "next";
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Simulated admin dashboard — review community-submitted road safety reports and update their status.",
};

/**
 * Admin Dashboard page.
 *
 * IMPORTANT: This is a frontend demonstration only.
 * There is no real authentication or server-side access control.
 * Administrative access is entirely simulated for demo purposes.
 */
export default function AdminPage() {
  return <AdminDashboardView />;
}
