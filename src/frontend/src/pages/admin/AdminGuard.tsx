import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("buildify_admin_auth") === "true";
    setAuthed(isAuth);
    setChecked(true);
    if (!isAuth) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  if (!checked) {
    return (
      <div
        className="min-h-screen bg-muted flex items-center justify-center"
        data-ocid="admin.guard.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{
              borderColor: "oklch(var(--brand-teal))",
              borderTopColor: "transparent",
            }}
          />
          <p className="text-sm text-muted-foreground">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return null;
  }

  return <>{children}</>;
}
