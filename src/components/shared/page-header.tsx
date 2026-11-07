import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon?: React.ReactNode;
  iconColor?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Consistent page header used across all interior pages.
 * Provides a unified top-of-page layout with optional icon, title,
 * description, and a right-aligned action slot.
 */
export function PageHeader({
  icon,
  iconColor = "bg-primary/10 text-primary",
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div
            className={cn(
              "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
              iconColor
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
