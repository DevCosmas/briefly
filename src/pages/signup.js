import FormPage from '../lib/form';
import Button from '../components/button';
import style from '../utils/btn.style';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
const formBtnStyle = {
  ...style,
  width: '90%',
  marginLeft: '0',
};

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await signUp(email, password, username);
  }
  useEffect(
    function () {
      if (isAuthenticated) navigate('/dashboard', { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <FormPage>
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
            Sign Up
            {/* {loader ? 'Processing...' : 'Sign up'} */}
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
