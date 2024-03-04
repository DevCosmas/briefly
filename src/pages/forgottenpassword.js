import FormPage from '../lib/form';
import Button from '../components/button';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';
import axios from 'axios';
import { set } from 'mongoose';

function ForgottenPasswordPage() {
  const {
    isAuthenticated,
    alertMessage,
    alertType,
    setAlertMessage,
    setAlertType,
    token,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  async function forgettenpassword(email) {
    try {
      if (!isAuthenticated) return navigate('/login');
      const response = await axios.post(
        'http://localhost:8000/api/user/forget_Password',
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLoader(true);
        const { message } = response.data;
        console.log(response.data);
        setAlertMessage(message);
        setAlertType('success');
        setLoader(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 429) {
        setLoader(false);
        setAlertMessage(error.response.data);
        setAlertType('fail');
        // console.log(error.response);
      } else if (error.response.data.message === 'jwt expired') {
        setAlertMessage('');
        setAlertType('');
        navigate('/login');
      } else {
        console.log(error.response);
        setLoader(false);
        setAlertMessage(error.response.data.message);
        setAlertType('fail');
      }
    }
  }

  async function handleForgettenPassword(event) {
    event.preventDefault();
    await forgettenpassword(email);
    // console.log(email, password);
  }

  useEffect(
    function () {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 1500);

      return () => clearTimeout(timer);
    },
    [alertMessage, setAlertMessage]
  );
  return (
    <FormPage>
      {alertMessage !== '' && (
        <ShowAlert
          alertMessage={alertMessage}
          alertType={alertType}></ShowAlert>
      )}
      <header className="header-container">
        <span className="brandName">Briefly</span>
      </header>
      <main>
        <form
          className="login-form"
          onSubmit={(e) => handleForgettenPassword(e)}>
          <label>Get your reset Token mailed to your address</label>
          <input
            type="text"
            placeholder="Email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button className={'form-btn'}>
            {loader ? 'Sending...' : '  Send Token'}
          </Button>
        </form>
      </main>
    </FormPage>
  );
}

export default ForgottenPasswordPage;
