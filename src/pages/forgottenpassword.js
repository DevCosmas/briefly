import FormPage from '../lib/form';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { BASEURLDEV } from '../utils/constant';
import { handleServerError } from '../lib/errorHandler';
import { toast } from 'react-toastify';
import Notification from '../components/notification';

function ForgottenPasswordPage() {
  const { setTitle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  async function forgettenpassword(email) {
    try {
      const response = await axios.post(
        `${BASEURLDEV}/api/user/forget_Password`,
        { email }
      );
      if (response.status === 200) {
        const { message } = response.data;
        toast.success(message);
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      handleServerError(error.response.status, error.response.data.message);
    }
  }

  async function handleForgettenPassword(event) {
    event.preventDefault();
    setLoader(true);
    try {
      const isSuccess = await forgettenpassword(email);
      if (isSuccess) {
        navigate('/resetPassword');
      }
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => setTitle('Forgot_password'), [setTitle]);

  return (
    <FormPage className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email to receive a password reset token.
          </p>
        </header>
        <form
          onSubmit={handleForgettenPassword}
          className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white text-sm font-medium ${
              loader
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            disabled={loader}>
            {loader ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Reset Token'
            )}
          </Button>
        </form>
      </div>
      <Notification />
    </FormPage>
  );
}

export default ForgottenPasswordPage;
