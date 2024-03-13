import FormPage from '../lib/form';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';

function LoginPage() {
  const {
    login,
    msg,
    msgStatus,
    setMsg,
    loader,
    setLoader,
    setTitle,
    isSucess,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginSubmit(event) {
    event.preventDefault();
    setLoader(true);
    login(email, password)
      .then(() => {
        console.log('Login successful');
        return true;
      })
      .then((isSuccess) => {
        if (isSuccess) {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setLoader(false);
      });
  }

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
            type="email"
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
            {loader ? 'Signin in ...' : 'Login'}
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
