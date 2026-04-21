import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  variant?: "default" | "teal" | "orange" | "muted";
  className?: string;
  "data-ocid"?: string;
}

const variantStyles = {
  default: "admin-card",
  teal: "bg-brand-teal text-white rounded-md border border-brand-teal shadow-xs p-4 sm:p-6",
  orange:
    "bg-brand-orange text-white rounded-md border border-brand-orange shadow-xs p-4 sm:p-6",
  muted: "bg-muted rounded-md border border-border shadow-xs p-4 sm:p-6",
};

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
  className,
  "data-ocid": dataOcid,
}: AdminStatCardProps) {
  const isColored = variant === "teal" || variant === "orange";

  return (
    <div className={cn(variantStyles[variant], className)} data-ocid={dataOcid}>
      <div className="flex items-start justify-between mb-3">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wider leading-tight",
            isColored ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {title}
        </p>
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
              isColored ? "bg-white/15" : "bg-muted",
            )}
          >
            <span className={isColored ? "text-white" : "text-brand-teal"}>
              {icon}
            </span>
          </div>
        )}
      </div>

      <p
        className={cn(
          "text-3xl font-bold font-display leading-none tabular-nums",
          isColored ? "text-white" : "text-brand-teal",
        )}
      >
        {value}
      </p>

      {subtitle && (
        <p
          className={cn(
            "text-sm mt-2 leading-snug",
            isColored ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}

      {trend && (
        <div
          className={cn(
            "flex items-center gap-1 mt-3 text-xs font-medium",
            trend.value > 0
              ? isColored
                ? "text-white/80"
                : "text-green-600"
              : trend.value < 0
                ? isColored
                  ? "text-white/80"
                  : "text-destructive"
                : isColored
                  ? "text-white/60"
                  : "text-muted-foreground",
          )}
        >
          {trend.value > 0 ? (
            <ArrowUpRight size={13} />
          ) : trend.value < 0 ? (
            <ArrowDownRight size={13} />
          ) : (
            <Minus size={13} />
          )}
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
}
