import FormPage from '../lib/form';
import Button from '../components/button';
import style from '../utils/btn.style';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';

const formBtnStyle = {
  ...style,
  width: '90%',
  marginLeft: '0',
};

function LoginPage() {
  const { login, isAuthenticated, msg, msgStatus, setMsg } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function handleLoginSubmit(event) {
    event.preventDefault();
    await login(email, password);
    console.log(email, password);
  }
  useEffect(
    function () {
      console.log(isAuthenticated);
      if (isAuthenticated) navigate('/dashboard', { replace: true });
    },
    [isAuthenticated, navigate]
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, setMsg]);
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
          <Button
            // backgroundColor={'#3c3c3c'}
            // textColor={'#fff'}
            // style={formBtnStyle}
            // hoverBackgrColor={'#144ee3 '}
            // hoverTextColor={'#c9ced6'}
            className={'form-btn'}>
            login
            {/* {loader ? 'processing...' : 'login'} */}
          </Button>
          <span className="form-redirect-msg">
            Don't have an Account? Sign up{' '}
            <Link
              className="redirect-link"
              to="/signUp">
              here
            </Link>
          </span>
          {/* <span className="link-em">---OR---</span> */}

          <span className="form-redirect-msg">
            Forgot Password? Click Here{' '}
            <Link
              className="redirect-link"
              to="/signUp">
              here
            </Link>
          </span>
        </form>
      </main>
    </FormPage>
  );
}

export default LoginPage;
