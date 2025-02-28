import { RouteNames } from '@/constraints/route-name';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Add the current path as a redirectTo query parameter
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${RouteNames.SignIn}?redirectTo=${redirectTo}`} />;
  }

  return <>{children}</>;
}
