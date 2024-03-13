import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const USER = localStorage.getItem('user');
  const PARSEDUSER = USER ? JSON.parse(USER) : null;
  const { isLoggedIn, expTime } = PARSEDUSER || {};
  const CURRENTTIME = Math.floor(Date.now() / 1000);
  useEffect(() => {
    if (!isLoggedIn || CURRENTTIME >= expTime) {
      navigate('/login');
      localStorage.removeItem('user');
    }

    const clearLocalStorageTimeout = setTimeout(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }, 3600 * 1000);

    return () => clearTimeout(clearLocalStorageTimeout);
  }, [navigate, CURRENTTIME, expTime, isLoggedIn]);

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;
