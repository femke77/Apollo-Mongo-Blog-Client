import { Navigate } from 'react-router-dom';
import { useLoggedIn } from '../App';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn] = useLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
