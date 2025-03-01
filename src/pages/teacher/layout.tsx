import AuthGuard from "@/provider/AuthProvider";
import { SidebarTeacherLayout } from "@/components/layout/sidebar-teacher-layout";
import TeacherGuard from "@/provider/TeacherProvider";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <TeacherGuard>
        <SidebarTeacherLayout>{children}</SidebarTeacherLayout>
      </TeacherGuard>
    </AuthGuard>
  );
}
