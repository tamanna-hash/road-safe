import Link from "next/link";
import { MapPin, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

/**
 * Custom 404 page for RoadSafe.
 * Shown when a user navigates to a route that doesn't exist.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      {/* Icon */}
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <AlertTriangle className="size-8 text-muted-foreground" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-xl font-semibold text-foreground">Page not found</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button render={<Link href="/" />} className="gap-2">
          <ArrowLeft className="size-4" />
          Back to home
        </Button>
        <Button variant="outline" render={<Link href="/explore" />} className="gap-2">
          <MapPin className="size-4" />
          Explore map
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{APP_NAME} — Road Safety Platform</p>
    </div>
  );
}
