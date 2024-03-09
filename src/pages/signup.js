import FormPage from '../lib/form';
import Button from '../components/button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';

function SignUpPage() {
  const navigate = useNavigate();
  const {
    signUp,
    isAuthenticated,
    loader,
    setLoader,
    msg,
    msgStatus,
    setMsg,
    setTitle,
    isSucess,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoader(true);
    await signUp(email, password, username);
    navigate('/login');
    setLoader(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg('');
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, setMsg]);

  useEffect(() => setTitle('Sign Up'), [setTitle]);
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
          onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className={'form-btn'}>
            {loader ? 'Processing...' : 'Sign up'}
          </Button>
          <span className="form-redirect-msg">
            Already have an Account? Login <Link to="/login">here</Link>
          </span>
        </form>
      </main>
    </FormPage>
  );
}

export default SignUpPage;
