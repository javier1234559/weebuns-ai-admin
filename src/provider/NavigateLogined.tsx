import { useRoleStatus } from '@/feature/user/hooks/useRoleStatus';
import { useEffect, useState } from "react";
import { ROLES } from "@/constraints";
import { RouteNames } from "@/constraints/route-name";
import { useNavigate } from "react-router-dom";
import { delay, getLocalStorage } from "@/lib/utils";
import LoadingPage from '@/pages/loading';

interface NavigateLoginedProps {
  children: React.ReactNode;
}

export default function NavigateLogined({ children }: NavigateLoginedProps) {
  const isAuthenticated = getLocalStorage('isAuthenticated');
  const user = getLocalStorage('user');
  const { role } = useRoleStatus();
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    delay(1500).then(() => {
      setIsInitializing(false);
    })
  }, []);

  useEffect(() => {
    if (!isInitializing && isAuthenticated && user) {
      console.log("Current user roles:", user.roles);
      console.log("Selected role from URL:", role);

      if (role) {
        if (!user.roles.includes(role)) {
          console.log(`User does not have ${role} role. Redirecting to Unauthorized`);
          navigate(RouteNames.Unauthorized, { replace: true });
          return;
        }

        console.log(`User has ${role} role. Redirecting to ${role} dashboard`);
        if (role === ROLES.ADMIN) {
          navigate(RouteNames.Admin, { replace: true });
        } else if (role === ROLES.TEACHER) {
          navigate(RouteNames.Teacher, { replace: true });
        }
      }
      else {
        console.log("No specific role selected. Redirecting based on highest privilege");
        if (user.roles.includes(ROLES.ADMIN)) {
          navigate(RouteNames.Admin, { replace: true });
        } else if (user.roles.includes(ROLES.TEACHER)) {
          navigate(RouteNames.Teacher, { replace: true });
        } else {
          navigate(RouteNames.Home, { replace: true });
        }
      }
    }
  }, [isInitializing, isAuthenticated, user, navigate, role]);



  if (isInitializing) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
