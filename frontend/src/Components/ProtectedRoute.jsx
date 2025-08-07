import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const isStoredAuth = storedUser && storedToken;

  // Wait for loading to finish before making a decision
  if (loading) {
    return <div>Loading...</div>; // Or your Spinner component
  }

  if (!isAuthenticated && !isStoredAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
