import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const isStoredAuth = storedUser && storedToken;

  if (!isAuthenticated && !isStoredAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
