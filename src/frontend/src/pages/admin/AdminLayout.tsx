import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AdminGuard from "./AdminGuard";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; path?: string }[];
}

export default function AdminLayout({
  children,
  breadcrumb,
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminGuard>
      <div
        className="flex h-screen overflow-hidden bg-muted"
        data-ocid="admin.layout"
      >
        {/* Sidebar — handles mobile/tablet/desktop internally */}
        <AdminSidebar
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader
            onMobileMenuToggle={() => setMobileMenuOpen(true)}
            breadcrumb={breadcrumb}
          />

          <main
            className="flex-1 overflow-y-auto admin-content"
            data-ocid="admin.main.panel"
          >
            <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </AdminGuard>
  );
}
