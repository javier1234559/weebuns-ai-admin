import { getRedirectToLoginUrl } from '@/feature/user/utils';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    const loginAndRedirectTo = getRedirectToLoginUrl()
    return <Navigate to={loginAndRedirectTo} />;
  }

  return <>{children}</>;
}
