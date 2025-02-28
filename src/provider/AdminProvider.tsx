import { Navigate } from 'react-router-dom';
import { RouteNames } from '@/constraints/route-name';
interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to={RouteNames.SignIn} />;
  }

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user && user.roles && user.roles.includes('admin');

  if (!isAdmin) {
    return <Navigate to={RouteNames.Unauthorized} />;
  }

  return <>{children}</>;
}
