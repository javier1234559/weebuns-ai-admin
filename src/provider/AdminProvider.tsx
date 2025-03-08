import { Navigate } from "react-router-dom";
import { RouteNames } from "@/constraints/route-name";
import { useAuthStore } from "@/stores/auth-store";
import { ROLES } from "@/constraints";
interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user } = useAuthStore();
  const isAdmin = user && user.role === ROLES.ADMIN;

  if (!user) {
    return <Navigate to={RouteNames.SignIn} />;
  }

  if (!isAdmin) {
    return <Navigate to={RouteNames.Unauthorized} />;
  }

  return <>{children}</>;
}
