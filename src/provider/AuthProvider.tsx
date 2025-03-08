import { getRedirectToLoginUrl } from "@/feature/user/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuthStore();

  if (!user) {
    const loginAndRedirectTo = getRedirectToLoginUrl();
    return <Navigate to={loginAndRedirectTo} />;
  }

  return <>{children}</>;
}
