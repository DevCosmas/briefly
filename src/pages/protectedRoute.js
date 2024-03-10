import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const USER = localStorage.getItem('user');
  const PARSEDUSER = JSON.parse(USER);
  const { isLoggedIn, expTime } = PARSEDUSER;
  const CURRENTTIME = Date.now();
  console.log(CURRENTTIME, 'TIME');
  console.log(USER, 'USER');
  // console.log(localStorage.getItem('token'), 'token');
  useEffect(() => {
    if (!isLoggedIn || expTime >= CURRENTTIME) {
      navigate('/login');
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, expTime, CURRENTTIME, navigate]);

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;
