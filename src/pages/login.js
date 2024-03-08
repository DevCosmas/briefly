import FormPage from '../lib/form';
import Button from '../components/button';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';

function LoginPage() {
  const {
    login,
    isAuthenticated,
    msg,
    msgStatus,
    setMsg,
    loader,
    setLoader,
    setTitle,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLoginSubmit(event) {
    event.preventDefault();
    if (loader) {
      setLoader(false);
      await login(email, password);
    } else {
      setLoader(true);
      await login(email, password);
    }
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate('/dashboard', { replace: true });
    },
    [isAuthenticated, navigate]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg('');
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, setMsg]);
  useEffect(() => setTitle('Login'), [setTitle]);
  return (
    <FormPage>
      {msg !== '' && (
        <ShowAlert
          alertMessage={msg}
          alertType={msgStatus}></ShowAlert>
      )}
      <header className="header-container">
        <span className="brandName">Briefly</span>
      </header>
      <main>
        <form
          className="login-form"
          onSubmit={(e) => handleLoginSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className={'form-btn'}>
            {loader ? 'Sign in ...' : 'Login'}
          </Button>

          <span className="form-redirect-msg">
            Don't have an Account? Sign up{' '}
            <Link
              className="redirect-link"
              to="/signUp">
              here
            </Link>
          </span>

          <span className="form-redirect-msg">
            Forgot Password? Click Here{' '}
            <Link
              className="redirect-link"
              to="/reset_token">
              here
            </Link>
          </span>
        </form>
      </main>
    </FormPage>
  );
}

export default LoginPage;
