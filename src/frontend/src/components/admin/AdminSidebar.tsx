import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
  {
    label: "Projects",
    path: "/admin/projects",
    icon: <FolderKanban size={18} />,
  },
  { label: "Services", path: "/admin/services", icon: <Wrench size={18} /> },
  { label: "Team", path: "/admin/team", icon: <Users size={18} /> },
  {
    label: "Submissions",
    path: "/admin/submissions",
    icon: <Inbox size={18} />,
  },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  tabletCollapsed?: boolean;
  onTabletCollapseToggle?: () => void;
}

function SidebarInner({
  collapsed,
  onCollapseToggle,
  onNavClick,
}: {
  collapsed: boolean;
  onCollapseToggle?: () => void;
  onNavClick?: () => void;
}) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isActive = (path: string) => {
    // Dashboard: exact match only — "/admin/projects".startsWith("/admin") would be true otherwise
    if (path === "/admin") return pathname === "/admin";
    // Sub-pages: startsWith so nested routes keep the parent item active
    return pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-white/10 min-h-[64px]",
          collapsed && "justify-center px-2",
        )}
      >
        <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center flex-shrink-0">
          <Building2 size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm font-display leading-tight truncate">
              Buildify
            </p>
            <p className="text-white/50 text-xs truncate">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto"
        aria-label="Admin navigation"
      >
        {!collapsed && (
          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavClick}
              data-ocid={`admin.nav.${item.label.toLowerCase()}`}
              title={collapsed ? item.label : undefined}
              activeProps={{}}
              activeOptions={{ exact: item.path === "/admin" }}
              className={cn(
                "admin-sidebar-item flex items-center gap-3 rounded-md min-h-[44px]",
                collapsed && "justify-center px-2",
                active && "active",
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {!collapsed && (
          <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Analytics
          </p>
        )}
        <span
          title={collapsed ? "Reports" : undefined}
          className={cn(
            "admin-sidebar-item flex items-center gap-3 rounded-md opacity-40 cursor-not-allowed min-h-[44px]",
            collapsed && "justify-center px-2",
          )}
        >
          <span className="flex-shrink-0">
            <BarChart3 size={18} />
          </span>
          {!collapsed && <span>Reports</span>}
        </span>
      </nav>

      {/* Collapse toggle (desktop/tablet only) */}
      {onCollapseToggle && (
        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={onCollapseToggle}
            onKeyDown={(e) => e.key === "Enter" && onCollapseToggle()}
            data-ocid="admin.sidebar.collapse_button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm min-h-[44px]"
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminSidebar({
  mobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  // Tablet (md-lg) starts collapsed (icon-only)
  const [tabletCollapsed, setTabletCollapsed] = useState(true);

  return (
    <>
      {/* Tablet sidebar (md 768px – lg 1023px): icon-only by default, can expand */}
      <aside
        className={cn(
          "admin-sidebar hidden md:flex lg:hidden flex-col flex-shrink-0 transition-all duration-300",
          tabletCollapsed ? "w-16" : "w-56",
        )}
        data-ocid="admin.sidebar.tablet"
      >
        <SidebarInner
          collapsed={tabletCollapsed}
          onCollapseToggle={() => setTabletCollapsed((v) => !v)}
        />
      </aside>

      {/* Desktop sidebar (lg 1024px+): starts expanded */}
      <aside
        className={cn(
          "admin-sidebar hidden lg:flex flex-col flex-shrink-0 transition-all duration-300",
          desktopCollapsed ? "w-16" : "w-60",
        )}
        data-ocid="admin.sidebar"
      >
        <SidebarInner
          collapsed={desktopCollapsed}
          onCollapseToggle={() => setDesktopCollapsed((v) => !v)}
        />
      </aside>

      {/* Mobile overlay (< md 768px) */}
      {mobileOpen && (
        <dialog
          open
          className="fixed inset-0 z-40 md:hidden w-full h-full max-w-none max-h-none m-0 p-0 border-0 bg-transparent"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm cursor-default border-0 p-0"
            onClick={onMobileClose}
            onKeyDown={(e) => e.key === "Escape" && onMobileClose?.()}
            aria-label="Close navigation menu"
          />
          {/* Drawer */}
          <aside
            className="admin-sidebar absolute left-0 top-0 bottom-0 w-64 flex flex-col shadow-2xl z-10"
            data-ocid="admin.sidebar.mobile"
          >
            <SidebarInner collapsed={false} onNavClick={onMobileClose} />
          </aside>
        </dialog>
      )}
    </>
  );
}
