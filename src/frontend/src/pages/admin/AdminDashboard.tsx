import type { ContactSubmission, Project } from "@/backend.d";
import { ProjectCategory } from "@/backend.d";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable, { type ColumnDef } from "@/components/admin/AdminTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useProjects,
  useServices,
  useSubmissions,
  useTeamMembers,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  CircleDot,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  PieChart,
  Plus,
  RefreshCw,
  Settings2,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ── Brand palette (hex) for recharts (no CSS variables in SVG attributes) ──
const TEAL = "#2C7A7B";
const ORANGE = "#F05A28";
const CHART_COLORS = ["#e8533a", "#2C7A7B", "#2A3E44", "#d4a017", "#c0882e"];

// ── Category display labels — must match the ProjectCategory enum exactly ──
const CATEGORY_DISPLAY_LABELS: Record<ProjectCategory, string> = {
  [ProjectCategory.SiteRegrading]: "Site Regrading",
  [ProjectCategory.Drainage]: "Drainage",
  [ProjectCategory.Foundation]: "Foundation",
  [ProjectCategory.Commercial]: "Commercial",
  [ProjectCategory.Residential]: "Residential",
};

// ── Category badge colors for the recent projects table ──
const CATEGORY_BADGE_STYLES: Record<ProjectCategory, string> = {
  [ProjectCategory.SiteRegrading]: "bg-teal-50 text-teal-700 border-teal-200",
  [ProjectCategory.Drainage]: "bg-blue-50 text-blue-700 border-blue-200",
  [ProjectCategory.Foundation]: "bg-slate-100 text-slate-700 border-slate-200",
  [ProjectCategory.Commercial]:
    "bg-orange-50 text-orange-700 border-orange-200",
  [ProjectCategory.Residential]: "bg-amber-50 text-amber-700 border-amber-200",
};

const quickActions = [
  {
    label: "Add New Project",
    description: "Publish a portfolio project",
    path: "/admin/projects",
    ocid: "admin.dashboard.add_project_button",
    icon: <FolderKanban size={18} />,
  },
  {
    label: "Manage Team",
    description: "Add or edit team members",
    path: "/admin/team",
    ocid: "admin.dashboard.manage_team_button",
    icon: <Users size={18} />,
  },
  {
    label: "View Submissions",
    description: "Review contact form entries",
    path: "/admin/submissions",
    ocid: "admin.dashboard.view_submissions_button",
    icon: <Inbox size={18} />,
  },
  {
    label: "Edit Services",
    description: "Update service listings",
    path: "/admin/services",
    ocid: "admin.dashboard.edit_services_button",
    icon: <Settings2 size={18} />,
  },
];

// ── Custom Tooltip ──
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-slate text-white rounded-xl shadow-xl px-4 py-3 border border-white/10 text-sm">
      {label && (
        <p className="font-semibold text-white/80 mb-1.5 text-xs uppercase tracking-wide">
          {label}
        </p>
      )}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-white/70">{entry.name}:</span>
          <span className="font-bold text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Chart card wrapper ──
function ChartCard({
  icon,
  title,
  subtitle,
  children,
  className = "",
  ocid,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  ocid?: string;
}) {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-border p-5 md:p-6 ${className}`}
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-teal">{icon}</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-display leading-tight">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
        </div>
        {/* Live badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-600 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Chart loading skeleton ──
function ChartSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div
      className={`${height} flex flex-col gap-3 justify-end pb-2`}
      data-ocid="admin.dashboard.chart.loading_state"
    >
      <div className="flex items-end gap-2 h-full px-4">
        {[55, 80, 40, 95, 60, 70, 45].map((pct) => (
          <Skeleton
            key={pct}
            className="flex-1 rounded-t"
            style={{ height: `${pct}%` }}
          />
        ))}
      </div>
      <div className="flex gap-2 px-4">
        {[40, 55, 35, 50, 45, 48, 38].map((w) => (
          <Skeleton key={w} className="h-3 flex-1 rounded" />
        ))}
      </div>
    </div>
  );
}

// ── Empty state ──
function ChartEmpty({ message }: { message: string }) {
  return (
    <div
      className="h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground"
      data-ocid="admin.dashboard.chart.empty_state"
    >
      <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center">
        <BarChart2 size={22} className="text-brand-teal/50" />
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const {
    data: projects = [],
    isLoading: loadingProjects,
    refetch: refetchProjects,
  } = useProjects();
  const {
    data: submissions = [],
    isLoading: loadingSubmissions,
    refetch: refetchSubmissions,
  } = useSubmissions();
  const {
    data: teamMembers = [],
    isLoading: loadingTeam,
    refetch: refetchTeam,
  } = useTeamMembers();
  const {
    data: services = [],
    isLoading: loadingServices,
    refetch: refetchServices,
  } = useServices();

  // ── Derived counts (accurate computation from live data) ──
  const activeProjects = projects.filter((p) => p.active === true).length;
  const completedProjects = projects.filter((p) => p.active === false).length;
  const unreadSubmissions = submissions.filter((s) => !s.read).length;

  const recentSubmissions = [...submissions]
    .sort((a, b) => Number(b.submittedAt - a.submittedAt))
    .slice(0, 5);

  const recentProjects = [...projects]
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 5);

  const isLoading =
    loadingProjects || loadingSubmissions || loadingTeam || loadingServices;

  function handleRefreshAll() {
    refetchProjects();
    refetchSubmissions();
    refetchTeam();
    refetchServices();
  }

  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // ── Analytics data derivations ──

  // 1. Projects by category — map enum values to human-readable labels
  const categoryCountMap: Record<string, number> = {};
  for (const p of projects) {
    // p.category is a ProjectCategory enum string like "SiteRegrading"
    const label =
      CATEGORY_DISPLAY_LABELS[p.category as ProjectCategory] ??
      String(p.category);
    categoryCountMap[label] = (categoryCountMap[label] || 0) + 1;
  }
  // Ensure all 5 categories always appear (even if zero, when projects exist)
  const allCategoryData =
    projects.length > 0
      ? Object.values(ProjectCategory).map((cat) => ({
          name: CATEGORY_DISPLAY_LABELS[cat],
          count: categoryCountMap[CATEGORY_DISPLAY_LABELS[cat]] ?? 0,
        }))
      : Object.entries(categoryCountMap).map(([name, count]) => ({
          name,
          count,
        }));

  // Only show categories with > 0 count in the chart (cleaner bars)
  const categoryData = allCategoryData.filter((d) => d.count > 0);

  // 2. Submissions by project type (donut)
  const submissionTypeMap: Record<string, number> = {};
  for (const s of submissions) {
    const t = s.projectType || "Other";
    submissionTypeMap[t] = (submissionTypeMap[t] || 0) + 1;
  }
  const submissionTypeData = Object.entries(submissionTypeMap).map(
    ([name, value]) => ({ name, value }),
  );
  const totalSubmissions = submissions.length;

  // 3. Project status donut — accurate Active (active===true) vs Completed (active===false)
  const statusData =
    projects.length > 0
      ? [
          { name: "Active", value: activeProjects },
          { name: "Completed", value: completedProjects },
        ].filter((d) => d.value > 0)
      : [];

  // 4. Monthly submissions (last 12 months)
  const now = new Date();
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    return {
      month: d.toLocaleString("en-US", { month: "short" }),
      year: d.getFullYear(),
      monthNum: d.getMonth(),
      count: 0,
    };
  });
  for (const s of submissions) {
    const ts = new Date(Number(s.submittedAt) / 1_000_000);
    const entry = monthlyData.find(
      (m) => m.monthNum === ts.getMonth() && m.year === ts.getFullYear(),
    );
    if (entry) entry.count += 1;
  }
  const monthlyChartData = monthlyData.map(({ month, count }) => ({
    month,
    count,
  }));

  const submissionColumns: ColumnDef<ContactSubmission>[] = [
    {
      key: "name",
      header: "Sender",
      render: (row) => (
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{row.name}</p>
          <p className="text-xs text-muted-foreground truncate">{row.email}</p>
        </div>
      ),
    },
    {
      key: "projectType",
      header: "Type",
      render: (row) => (
        <Badge variant="secondary" className="text-xs whitespace-nowrap">
          {row.projectType}
        </Badge>
      ),
    },
    {
      key: "submittedAt",
      header: "Date",
      render: (row) => (
        <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
          {formatDate(row.submittedAt)}
        </span>
      ),
    },
    {
      key: "read",
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap ${
            row.read ? "text-muted-foreground" : "text-brand-teal"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.read ? "bg-muted-foreground/40" : "bg-brand-teal"}`}
          />
          {row.read ? "Read" : "Unread"}
        </span>
      ),
    },
  ];

  const projectColumns: ColumnDef<Project>[] = [
    {
      key: "title",
      header: "Project",
      render: (row) => (
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{row.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {row.location || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (row) => (
        <Badge
          variant="outline"
          className={`text-xs whitespace-nowrap ${
            CATEGORY_BADGE_STYLES[row.category as ProjectCategory] ??
            "bg-muted text-muted-foreground border-border"
          }`}
        >
          {CATEGORY_DISPLAY_LABELS[row.category as ProjectCategory] ??
            String(row.category)}
        </Badge>
      ),
    },
    {
      key: "active",
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${
            row.active === true
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-muted text-muted-foreground border-border"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.active === true ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
          />
          {row.active === true ? "Active" : "Completed"}
        </span>
      ),
    },
  ];

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const cardMotionProps = (delayIndex: number) => ({
    initial: { opacity: 0, scale: 0.97, y: 12 } as const,
    whileInView: { opacity: 1, scale: 1, y: 0 } as const,
    transition: { duration: 0.45, delay: delayIndex * 0.1 },
    viewport: { once: true, margin: "-60px" } as const,
  });

  return (
    <div className="space-y-6 sm:space-y-8" data-ocid="admin.dashboard.page">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-brand-teal flex items-center justify-center flex-shrink-0">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display leading-tight">
              Dashboard
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              {today}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {unreadSubmissions > 0 && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-xs font-medium text-brand-teal"
              data-ocid="admin.dashboard.unread_badge"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              {unreadSubmissions} unread
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 min-h-[44px] sm:min-h-0"
            onClick={handleRefreshAll}
            data-ocid="admin.dashboard.refresh_button"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        data-ocid="admin.dashboard.stats"
      >
        {isLoading ? (
          ["projects", "services", "team", "submissions"].map((key) => (
            <Skeleton
              key={key}
              className="h-32 rounded-md"
              data-ocid={`admin.dashboard.stat.${key}.loading_state`}
            />
          ))
        ) : (
          <>
            <AdminStatCard
              title="Total Projects"
              value={projects.length}
              subtitle={`${activeProjects} active · ${completedProjects} completed`}
              icon={<FolderKanban size={16} />}
              trend={{
                value: activeProjects,
                label: `${activeProjects} currently active`,
              }}
              data-ocid="admin.dashboard.stat.projects"
            />
            <AdminStatCard
              title="Services"
              value={services.length}
              subtitle="Active service listings"
              icon={<Wrench size={16} />}
              data-ocid="admin.dashboard.stat.services"
            />
            <AdminStatCard
              title="Team Members"
              value={teamMembers.length}
              subtitle="Total staff on record"
              icon={<Users size={16} />}
              data-ocid="admin.dashboard.stat.team"
            />
            <AdminStatCard
              title="Submissions"
              value={submissions.length}
              subtitle={`${unreadSubmissions} unread`}
              icon={<Inbox size={16} />}
              variant={unreadSubmissions > 0 ? "teal" : "default"}
              trend={
                unreadSubmissions > 0
                  ? { value: 1, label: `${unreadSubmissions} need attention` }
                  : { value: 0, label: "All caught up" }
              }
              data-ocid="admin.dashboard.stat.submissions"
            />
          </>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div
        className="admin-card"
        data-ocid="admin.dashboard.quick_actions.panel"
      >
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Quick Actions
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Jump straight to common tasks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="group flex items-start gap-3 p-4 rounded-md border border-border bg-muted/40 hover:bg-brand-teal/5 hover:border-brand-teal/30 transition-all duration-200 text-left min-h-[64px]"
              onClick={() => navigate({ to: action.path })}
              data-ocid={action.ocid}
            >
              <div className="w-8 h-8 rounded-md bg-brand-teal/10 group-hover:bg-brand-teal/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <span className="text-brand-teal">{action.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-brand-teal transition-colors duration-200 leading-tight">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {action.description}
                </p>
              </div>
              <Plus
                size={14}
                className="ml-auto flex-shrink-0 text-muted-foreground group-hover:text-brand-teal opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Analytics Overview ── */}
      <section data-ocid="admin.dashboard.analytics.section">
        {/* Section header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 rounded-full bg-brand-teal" />
            <h2 className="text-xl font-bold text-foreground font-display">
              Analytics Overview
            </h2>
          </div>
          <p className="text-sm text-muted-foreground ml-4">
            Real-time insights from your projects and contact submissions.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* 1. Bar Chart — Projects by Category (full width) */}
          <motion.div className="lg:col-span-2" {...cardMotionProps(0)}>
            <ChartCard
              icon={<BarChart2 size={16} />}
              title="Projects by Category"
              subtitle="Distribution of all portfolio projects across categories"
              ocid="admin.dashboard.analytics.category_bar"
            >
              {loadingProjects ? (
                <ChartSkeleton height="h-64 lg:h-80" />
              ) : categoryData.length === 0 ? (
                <ChartEmpty message="No projects yet — add your first project to see data" />
              ) : (
                <div className="h-64 lg:h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      margin={{ top: 8, right: 16, left: -8, bottom: 4 }}
                    >
                      <defs>
                        <linearGradient
                          id="barGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={TEAL}
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="100%"
                            stopColor={TEAL}
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#6B7A80" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#6B7A80" }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        name="Projects"
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={56}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={`bar-${entry.name}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                            fillOpacity={0.85}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>
          </motion.div>

          {/* 2. Donut — Submissions by Project Type */}
          <motion.div {...cardMotionProps(1)}>
            <ChartCard
              icon={<PieChart size={16} />}
              title="Submissions by Type"
              subtitle="Contact form inquiries grouped by project type"
              ocid="admin.dashboard.analytics.submission_donut"
            >
              {loadingSubmissions ? (
                <ChartSkeleton height="h-48" />
              ) : submissionTypeData.length === 0 ? (
                <ChartEmpty message="No submissions yet" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="relative h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={submissionTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius="50%"
                          outerRadius="75%"
                          dataKey="value"
                          paddingAngle={3}
                        >
                          {submissionTypeData.map((entry, index) => (
                            <Cell
                              key={`cell-${entry.name}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPie>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-bold text-foreground font-display">
                        {totalSubmissions}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        total
                      </span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3">
                    {submissionTypeData.map((entry, index) => (
                      <div
                        key={entry.name}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{
                            background:
                              CHART_COLORS[index % CHART_COLORS.length],
                          }}
                        />
                        <span className="font-medium text-foreground">
                          {entry.name}
                        </span>
                        <span>({entry.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ChartCard>
          </motion.div>

          {/* 3. Donut — Project Status (Active vs Completed) */}
          <motion.div {...cardMotionProps(2)}>
            <ChartCard
              icon={<CircleDot size={16} />}
              title="Project Status"
              subtitle="Active vs. completed project distribution"
              ocid="admin.dashboard.analytics.status_donut"
            >
              {loadingProjects ? (
                <ChartSkeleton height="h-48" />
              ) : projects.length === 0 || statusData.length === 0 ? (
                <ChartEmpty message="No projects yet" />
              ) : (
                <div className="flex flex-col items-center">
                  {/* Summary row */}
                  <div className="flex gap-4 mb-3 w-full justify-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-700">
                        {activeProjects} Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200">
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-xs font-semibold text-orange-700">
                        {completedProjects} Completed
                      </span>
                    </div>
                  </div>
                  <div className="relative h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius="50%"
                          outerRadius="75%"
                          dataKey="value"
                          paddingAngle={4}
                        >
                          {statusData.map((entry) => (
                            <Cell
                              key={`status-${entry.name}`}
                              fill={entry.name === "Active" ? TEAL : ORANGE}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPie>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-bold text-foreground font-display">
                        {projects.length}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        projects
                      </span>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: TEAL }}
                      />
                      <span className="text-muted-foreground">
                        Active{" "}
                        <strong className="text-foreground">
                          ({activeProjects})
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: ORANGE }}
                      />
                      <span className="text-muted-foreground">
                        Completed{" "}
                        <strong className="text-foreground">
                          ({completedProjects})
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </ChartCard>
          </motion.div>

          {/* 4. Area Chart — Monthly Submission Trends (full width) */}
          <motion.div className="lg:col-span-2" {...cardMotionProps(3)}>
            <ChartCard
              icon={<TrendingUp size={16} />}
              title="Monthly Submission Trends"
              subtitle="Contact inquiries received over the last 12 months"
              ocid="admin.dashboard.analytics.monthly_area"
            >
              {loadingSubmissions ? (
                <ChartSkeleton height="h-64 lg:h-80" />
              ) : submissions.length === 0 ? (
                <ChartEmpty message="No submission data yet" />
              ) : (
                <div className="h-64 lg:h-80 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyChartData}
                      margin={{ top: 8, right: 16, left: -8, bottom: 4 }}
                    >
                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={TEAL}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor={TEAL}
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#6B7A80" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#6B7A80" }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                        formatter={(value) => (
                          <span style={{ color: "#6B7A80" }}>{value}</span>
                        )}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        name="Submissions"
                        stroke={TEAL}
                        strokeWidth={2.5}
                        fill="url(#areaGradient)"
                        dot={{ r: 3, fill: TEAL, strokeWidth: 0 }}
                        activeDot={{
                          r: 5,
                          fill: TEAL,
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>
          </motion.div>
        </div>
      </section>

      {/* ── Recent Data: stacked on mobile, side-by-side on xl ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Submissions */}
        <div
          className="admin-card space-y-4"
          data-ocid="admin.dashboard.recent_submissions.panel"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent Submissions
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest 5 contact form entries
              </p>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-brand-teal p-0 h-auto text-xs font-medium flex-shrink-0 min-h-[44px] sm:min-h-0"
              onClick={() => navigate({ to: "/admin/submissions" })}
              data-ocid="admin.dashboard.view_all_submissions_button"
            >
              View all →
            </Button>
          </div>
          <AdminTable
            columns={submissionColumns}
            data={recentSubmissions}
            isLoading={loadingSubmissions}
            emptyMessage="No submissions yet."
            pageSize={5}
            data-ocid="admin.dashboard.submissions.table"
          />
        </div>

        {/* Recent Projects */}
        <div
          className="admin-card space-y-4"
          data-ocid="admin.dashboard.recent_projects.panel"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent Projects
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest 5 portfolio projects
              </p>
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-brand-teal p-0 h-auto text-xs font-medium flex-shrink-0 min-h-[44px] sm:min-h-0"
              onClick={() => navigate({ to: "/admin/projects" })}
              data-ocid="admin.dashboard.view_all_projects_button"
            >
              View all →
            </Button>
          </div>
          <AdminTable
            columns={projectColumns}
            data={recentProjects}
            isLoading={loadingProjects}
            emptyMessage="No projects yet."
            pageSize={5}
            data-ocid="admin.dashboard.projects.table"
          />
        </div>
      </div>
    </div>
  );
}
