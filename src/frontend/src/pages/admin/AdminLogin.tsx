import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Eye,
  EyeOff,
  HardHat,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FEATURES = [
  { icon: HardHat, label: "Project Management" },
  { icon: ShieldCheck, label: "Secure Dashboard" },
  { icon: Building2, label: "Construction Analytics" },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    // Simulate a brief auth delay for polish
    await new Promise((r) => setTimeout(r, 700));
    localStorage.setItem("buildify_admin_auth", "true");
    setIsLoading(false);
    navigate({ to: "/admin" });
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row overflow-hidden"
      data-ocid="admin.login.page"
      style={{ background: "oklch(var(--brand-slate))" }}
    >
      {/* ── Left brand panel ───────────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden">
        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, white 0px, white 2px, transparent 2px, transparent 28px)",
          }}
        />

        {/* Geometric accent circles */}
        <div
          className="absolute top-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full opacity-10"
          style={{ background: "oklch(var(--brand-teal))" }}
        />
        <div
          className="absolute bottom-[-60px] left-[-40px] w-[260px] h-[260px] rounded-full opacity-[0.07]"
          style={{ background: "oklch(var(--brand-orange))" }}
        />
        {/* Orange diagonal slash */}
        <div
          className="absolute top-0 right-0 w-1 h-full opacity-60"
          style={{ background: "oklch(var(--brand-orange))" }}
        />

        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-3"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "oklch(var(--brand-teal))" }}
          >
            <Building2 size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl font-display tracking-wide">
              BUILDIFY
            </p>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              Admin Portal
            </p>
          </div>
        </motion.div>

        {/* Hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 space-y-6"
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full inline-block"
              style={{
                color: "oklch(var(--brand-orange))",
                background: "oklch(var(--brand-orange) / 0.12)",
              }}
            >
              Construction Management
            </p>
            <h2 className="text-4xl font-bold text-white font-display leading-tight">
              Build smarter.
              <br />
              <span style={{ color: "oklch(var(--brand-teal))" }}>
                Manage faster.
              </span>
            </h2>
            <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-xs">
              Your central command for projects, team members, services, and
              client submissions — all in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(var(--brand-teal) / 0.2)" }}
                >
                  <f.icon
                    size={16}
                    style={{ color: "oklch(var(--brand-teal))" }}
                  />
                </div>
                <span className="text-white/60 text-sm">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10 grid grid-cols-3 gap-3"
        >
          {[
            { value: "24+", label: "Projects" },
            { value: "12", label: "Team" },
            { value: "50+", label: "Inquiries" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-3 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="text-xl font-bold font-display"
                style={{ color: "oklch(var(--brand-teal))" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right login panel ──────────────────────────────────────── */}
      <div className="flex-1 lg:max-w-[480px] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-card lg:rounded-l-[2.5rem] lg:shadow-2xl min-h-screen lg:min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          {/* Mobile brand mark */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(var(--brand-teal))" }}
            >
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-foreground font-display">BUILDIFY</p>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "oklch(var(--brand-teal) / 0.12)" }}
              >
                <Lock size={13} style={{ color: "oklch(var(--brand-teal))" }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(var(--brand-teal))" }}
              >
                Secure Login
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground font-display leading-snug">
              Welcome back,
              <br />
              <span style={{ color: "oklch(var(--brand-teal))" }}>Admin</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Sign in to manage your Buildify dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@buildify.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11 bg-background border-input focus-visible:ring-1"
                  style={
                    {
                      "--tw-ring-color": "oklch(var(--brand-teal))",
                    } as React.CSSProperties
                  }
                  autoComplete="email"
                  data-ocid="admin.login.email_input"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11 bg-background border-input focus-visible:ring-1"
                  style={
                    {
                      "--tw-ring-color": "oklch(var(--brand-teal))",
                    } as React.CSSProperties
                  }
                  autoComplete="current-password"
                  data-ocid="admin.login.password_input"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="admin.login.toggle_password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-destructive bg-destructive/8 border border-destructive/20 px-3 py-2 rounded-lg"
                data-ocid="admin.login.error_state"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "oklch(var(--brand-teal))" }}
              disabled={isLoading}
              data-ocid="admin.login.submit_button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          {/* Divider + hint */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              This portal is restricted to authorized Buildify administrators.
              <br />
              Contact your system administrator if you need access.
            </p>
          </div>

          {/* Bottom orange accent bar */}
          <div className="mt-8 flex gap-1.5">
            <div
              className="h-1 flex-1 rounded-full opacity-30"
              style={{ background: "oklch(var(--brand-teal))" }}
            />
            <div
              className="h-1 w-8 rounded-full"
              style={{ background: "oklch(var(--brand-orange))" }}
            />
            <div
              className="h-1 flex-1 rounded-full opacity-10"
              style={{ background: "oklch(var(--brand-slate))" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
