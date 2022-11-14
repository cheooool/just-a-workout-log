import { Navigate } from 'react-router-dom';
import AuthService from '../features/auth/services/AuthService';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  if (!AuthService.hasToken()) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
