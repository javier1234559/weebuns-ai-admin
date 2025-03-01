import { SidebarAdminLayout } from "@/components/layout/sidebar-admin.layout";
import AdminGuard from "@/provider/AdminProvider";
import AuthGuard from "@/provider/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminGuard>
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <SidebarAdminLayout>{children}</SidebarAdminLayout>
          </div>
        </div>
      </AdminGuard>
    </AuthGuard>
  );
}
