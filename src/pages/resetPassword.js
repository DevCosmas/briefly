import FormPage from '../lib/form';
import Button from '../components/button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { BASEURLDEV } from '../utils/constant';
import { handleServerError } from '../lib/errorHandler';
import { toast } from 'react-toastify';
import Notification from '../components/notification';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { loader, setLoader } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');

  async function resetPassword(token, password, confirmPassword) {
    setLoader(true);
    try {
      const response = await axios.patch(
        `${BASEURLDEV}/api/user/reset_Password`,
        { token, password, confirmPassword }
      );
      if (response.status === 200) {
        toast.success('Password reset successfully');
        setLoader(false);
        navigate('/login');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      handleServerError(error.response.status, error.response.data.message);
    } finally {
      setLoader(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await resetPassword(token, password, confirmPassword);
  }

  return (
    <FormPage className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter the reset token sent to your email and set a new password.
          </p>
        </header>
        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          <div>
            <label
              htmlFor="token"
              className="block text-sm font-medium text-gray-700">
              Reset Token
            </label>
            <input
              id="token"
              type="text"
              placeholder="Enter reset token"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Processing...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </div>
      <Notification />
    </FormPage>
  );
}

export default ResetPasswordPage;
