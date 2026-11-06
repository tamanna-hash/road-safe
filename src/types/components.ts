/**
 * Component prop types for RoadSafe.
 *
 * Centralising prop shapes here keeps component files clean and makes it
 * easy to see the full API surface of each major component without opening
 * its implementation file.
 */

import type { Report, ReportFilters, ReportStats, ReportStatus } from "./report";

// ---------------------------------------------------------------------------
// Map components
// ---------------------------------------------------------------------------

export interface MapViewProps {
  /** Reports to render as markers on the map */
  reports: Report[];
  /** Currently active filters — determines which markers are visible */
  filters: ReportFilters;
  /** Called when the user clicks a marker; passes the selected report */
  onReportSelect: (report: Report) => void;
  /** The report currently selected (controls which popup is open) */
  selectedReport: Report | null;
}

export interface ReportMarkerProps {
  report: Report;
  isSelected: boolean;
  onClick: (report: Report) => void;
}

export interface MapFilterPanelProps {
  filters: ReportFilters;
  onChange: (filters: ReportFilters) => void;
}

export interface ReportPopupProps {
  report: Report;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Report list / card components
// ---------------------------------------------------------------------------

export interface ReportCardProps {
  report: Report;
  /** Show admin-only controls (status update buttons) */
  showAdminControls?: boolean;
  onClick?: (report: Report) => void;
}

export interface ReportListProps {
  reports: Report[];
  isLoading?: boolean;
  emptyMessage?: string;
  showAdminControls?: boolean;
  onReportClick?: (report: Report) => void;
}

export interface ReportDetailProps {
  report: Report;
  /** Whether to render the admin status-update panel */
  showAdminControls?: boolean;
  onStatusChange?: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onClose?: () => void;
}

// ---------------------------------------------------------------------------
// Report submission form
// ---------------------------------------------------------------------------

export interface ReportFormProps {
  /** Called with the newly created report after successful submission */
  onSuccess: (report: Report) => void;
}

export interface LocationPickerProps {
  value: { lat: number; lng: number; address?: string } | null;
  onChange: (location: { lat: number; lng: number; address?: string }) => void;
}

// ---------------------------------------------------------------------------
// Admin dashboard
// ---------------------------------------------------------------------------

export interface StatCardProps {
  label: string;
  value: number;
  /** Tailwind colour token for the accent (e.g. "blue", "yellow", "green") */
  color: "blue" | "yellow" | "green" | "orange" | "red" | "gray";
  icon?: React.ReactNode;
}

export interface AdminReportTableProps {
  reports: Report[];
  onStatusChange: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onViewDetail: (report: Report) => void;
}

export interface StatusUpdateFormProps {
  report: Report;
  onUpdate: (reportId: string, newStatus: ReportStatus, note?: string) => void;
  onCancel: () => void;
}

// ---------------------------------------------------------------------------
// Report tracking / My Reports
// ---------------------------------------------------------------------------

export interface StatusTimelineProps {
  report: Report;
}

export interface MyReportCardProps {
  report: Report;
  onClick: (report: Report) => void;
}

// ---------------------------------------------------------------------------
// Shared / layout components
// ---------------------------------------------------------------------------

export interface BadgeStatusProps {
  status: ReportStatus;
}

export interface SeverityBadgeProps {
  severity: import("./report").Severity;
}

export interface CategoryBadgeProps {
  category: import("./report").ReportCategory;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Stats (re-exported for convenience)
// ---------------------------------------------------------------------------

export interface DashboardStatsProps {
  stats: ReportStats;
}
