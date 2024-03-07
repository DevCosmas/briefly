import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(
    function () {
      if (!isAuthenticated) navigate('/login');
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}
export default ProtectedRoute;
