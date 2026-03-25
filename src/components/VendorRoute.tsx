import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function VendorRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'vendor') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
