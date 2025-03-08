import { Navigate } from "react-router-dom";
import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/stores/auth-store";
import { ROLES } from "@/constraints";
interface TeacherGuardProps {
  children: React.ReactNode;
}

export default function TeacherGuard({ children }: TeacherGuardProps) {
  const { user } = useAuthStore();
  const isTeacher = user && user.role === ROLES.TEACHER;

  if (!user) {
    return <Navigate to={RouteNames.SignIn} />;
  }

  if (!isTeacher) {
    return <Navigate to={`${RouteNames.Unauthorized}`} />;
  }

  return <>{children}</>;
}
