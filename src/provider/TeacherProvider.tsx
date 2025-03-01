import { Navigate } from 'react-router-dom';
import { RouteNames } from '@/constraints/route-name';
interface TeacherGuardProps {
  children: React.ReactNode;
}

export default function TeacherGuard({ children }: TeacherGuardProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to={RouteNames.SignIn} />;
  }

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isTeacher = user && user.roles && user.roles.includes('teacher');

  if (!isTeacher) {
    return <Navigate to={`${RouteNames.Unauthorized}`} />;
  }

  return <>{children}</>;
}
