import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus !== "initializing" && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [loginStatus, isAuthenticated, navigate]);

  if (loginStatus === "initializing") {
    return (
      <div
        className="min-h-screen bg-muted flex items-center justify-center"
        data-ocid="admin.guard.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-brand-teal border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="space-y-3 w-full max-w-sm px-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-3/4" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
