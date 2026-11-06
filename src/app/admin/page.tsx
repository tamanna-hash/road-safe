/**
 * Admin Dashboard page — Review and manage submitted reports.
 *
 * IMPORTANT: This is a simulated administrative interface for demonstration
 * purposes only. There is no real authentication or access control.
 * Full implementation in Phase 10.
 */
export default function AdminPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Report management interface — coming in Phase 10.
      </p>
      <p className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
        Demo only — administrative access is simulated. No real authentication.
      </p>
    </main>
  );
}
