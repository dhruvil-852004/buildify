import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, User } from "lucide-react";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
  breadcrumb?: { label: string; path?: string }[];
}

function getBreadcrumbFromPath(
  pathname: string,
): { label: string; path?: string }[] {
  const map: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/projects": "Projects",
    "/admin/services": "Services",
    "/admin/team": "Team",
    "/admin/submissions": "Submissions",
  };
  const crumbs: { label: string; path?: string }[] = [
    { label: "Admin", path: "/admin" },
  ];
  if (pathname !== "/admin" && map[pathname]) {
    crumbs.push({ label: map[pathname] });
  }
  return crumbs;
}

export default function AdminHeader({
  onMobileMenuToggle,
  breadcrumb,
}: AdminHeaderProps) {
  const { identity, clear, isAuthenticated } = useInternetIdentity();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const crumbs = breadcrumb ?? getBreadcrumbFromPath(pathname);

  const principalId = identity?.getPrincipal().toText() ?? "";
  const shortId = principalId
    ? `${principalId.slice(0, 5)}…${principalId.slice(-4)}`
    : "Admin";

  return (
    <header
      className="admin-header flex items-center gap-3 px-3 sm:px-6 h-16 min-h-[64px]"
      data-ocid="admin.header"
    >
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground flex-shrink-0 min-h-[44px] min-w-[44px]"
        onClick={onMobileMenuToggle}
        data-ocid="admin.header.menu_button"
        aria-label="Toggle mobile menu"
      >
        <Menu size={20} />
      </Button>

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1 text-sm min-w-0 flex-1 overflow-hidden"
        aria-label="Breadcrumb"
      >
        {crumbs.map((crumb, i) => (
          <span
            key={crumb.label}
            className="flex items-center gap-1 min-w-0 shrink-0"
          >
            {i > 0 && (
              <span className="text-muted-foreground text-xs flex-shrink-0">
                /
              </span>
            )}
            {i === crumbs.length - 1 ? (
              <span className="font-semibold text-foreground truncate max-w-[140px] sm:max-w-none">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path ?? "/admin"}
                className="text-muted-foreground hover:text-foreground truncate hidden sm:inline"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Session status — desktop only */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground">
          <span
            className={`w-1.5 h-1.5 rounded-full ${isAuthenticated ? "bg-green-500" : "bg-amber-500"}`}
          />
          {isAuthenticated ? "Active" : "Connecting…"}
        </div>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 h-10 min-w-[44px] min-h-[44px]"
              data-ocid="admin.header.user_menu"
              aria-label="User menu"
            >
              <div className="w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                {shortId}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground mt-0.5 break-all">
                {shortId}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                clear();
                navigate({ to: "/" });
              }}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer min-h-[44px]"
              data-ocid="admin.header.logout_button"
            >
              <LogOut size={14} className="mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
