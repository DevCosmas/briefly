import FormPage from '../lib/form';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Notification from '../components/notification';

function LoginPage() {
  const { login, loader, setLoader, setTitle, isSuccess } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoader(true);
    const isLoggedIn = await login(email, password);

    if (isLoggedIn) return navigate('/dashboard');
    return null;
  }

  useEffect(() => setTitle('Login'), [setTitle]);

  return (
    <FormPage>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Briefly</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Please log in to continue.
          </p>
        </header>

        <form
          className="space-y-4"
          onSubmit={(e) => handleLoginSubmit(e)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            {loader ? 'Signing in ...' : 'Login'}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signUp"
                className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </span>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Forgot your password?{' '}
              <Link
                to="/reset_token"
                className="text-blue-600 hover:underline">
                Click here
              </Link>
            </span>
          </div>
        </form>
      </div>
      <Notification />
    </FormPage>
  );
}

export default LoginPage;
