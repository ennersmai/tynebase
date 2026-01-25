import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Building2 } from "lucide-react";

export default function TenantNotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-ground)] p-4">
      <div className="text-center max-w-md">
        <Building2 className="h-24 w-24 text-[var(--text-tertiary)] mx-auto mb-6 opacity-50" />
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
          Organization not found
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          The organization you're trying to access doesn't exist or has been removed.
          Please check the URL and try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Go to Homepage
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" className="w-full sm:w-auto">
              Create Workspace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
