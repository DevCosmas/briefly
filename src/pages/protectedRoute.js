import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isLoggedIn = localStorage.getItem('auth');
  const USER = localStorage.getItem('user');
  // console.log(isLoggedIn, 'LOGGED IN');
  console.log(USER, 'USER');
  // console.log(localStorage.getItem('token'), 'token');
  useEffect(
    function () {
      if (!isLoggedIn) navigate('/login');
    },
    [isLoggedIn, navigate]
  );
  return isLoggedIn ? children : null;
}
export default ProtectedRoute;
