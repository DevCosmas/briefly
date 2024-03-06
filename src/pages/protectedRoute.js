// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';
// import { useEffect } from 'react';

// function ProtectedRoute({ children }) {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   useEffect(
//     function () {
//       if (!isAuthenticated) navigate('/login');
//     },
//     [isAuthenticated, navigate]
//   );
//   return isAuthenticated ? children : null;
// }
// export default ProtectedRoute;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (storedAuth === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return loggedIn ? children : null;
}

export default ProtectedRoute;
