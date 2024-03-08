import '../App.css';
import React from 'react';
import Button from '../components/button';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/logo';
import { useAuth } from '../context/authContext';

function ErrorPage() {
  const { setTitle } = useAuth();
  useEffect(() => setTitle('ERROR💥'), [setTitle]);
  return (
    <div className="home modal error-container">
      <h2 className="error_h2">404 Error 💥</h2>
      <p className="error_p">Page not found</p>
      <Link to={'/'}>
        <Button className={'error_btn'}>Go home</Button>
      </Link>
    </div>
  );
}
export default ErrorPage;
