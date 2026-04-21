import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Building2, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AdminLogin() {
  const { login, loginStatus, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setIsLogging(true);
    try {
      await login();
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div
      className="min-h-screen flex"
      data-ocid="admin.login.page"
      style={{ background: "oklch(var(--brand-slate))" }}
    >
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Geometric background accents */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full border border-white translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-white -translate-x-1/2 -translate-y-1/2 rotate-45" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-sm text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white font-display mb-3">
            Buildify Admin
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Manage your construction company's projects, services, team members,
            and client submissions from one central dashboard.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Projects", value: "24+" },
              { label: "Team Members", value: "12" },
              { label: "Submissions", value: "50+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <p className="text-xl font-bold text-brand-teal font-display">
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6 lg:p-12 bg-card lg:rounded-l-3xl lg:shadow-2xl">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-foreground font-display">Buildify</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center">
              <Lock size={15} className="text-brand-teal" />
            </div>
            <span className="text-xs font-semibold text-brand-teal uppercase tracking-wider">
              Secure Access
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground font-display mb-1">
            Sign In to Admin
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Authenticate with Internet Identity to continue.
          </p>

          {/* Auth card */}
          <div className="p-5 rounded-xl border border-border bg-muted/30 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Internet Identity
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Secure, passwordless authentication powered by the Internet
                  Computer. Your identity is cryptographically verified.
                </p>
              </div>
            </div>
          </div>

          <Button
            className="w-full admin-button-primary py-5 text-base font-semibold"
            onClick={handleLogin}
            disabled={isLogging || loginStatus === "logging-in"}
            data-ocid="admin.login.submit_button"
          >
            {isLogging || loginStatus === "logging-in" ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Authenticating…
              </span>
            ) : (
              "Sign In with Internet Identity"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Only authorized admins can access this panel.
            <br />
            Contact your system administrator if access is needed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
