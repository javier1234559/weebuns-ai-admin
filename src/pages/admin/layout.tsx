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
        <SidebarAdminLayout>{children}</SidebarAdminLayout>
      </AdminGuard>
    </AuthGuard>
  );
}
