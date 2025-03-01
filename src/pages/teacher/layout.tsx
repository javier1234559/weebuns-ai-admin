import AuthGuard from "@/provider/AuthProvider";
import { SidebarTeacherLayout } from "@/components/layout/sidebar-teacher-layout";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarTeacherLayout>{children}</SidebarTeacherLayout>
    </AuthGuard>
  );
}
