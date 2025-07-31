import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useAuth = (requireAuth = true) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  useEffect(() => {
    // Get stored authentication data
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const isStoredAuth = storedUser && storedToken;

    if (requireAuth && !isAuthenticated && !isStoredAuth) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate, requireAuth]);

  return { isAuthenticated, user };
};
