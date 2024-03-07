import FormPage from '../lib/form';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';
import axios from 'axios';

function ForgottenPasswordPage() {
  const { isAuthenticated, msg, msgStatus, setMsgStatus, setMsg, token } =
    useAuth();
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
        setMsg(message);
        setMsgStatus('success');
        setLoader(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 429) {
        setLoader(false);
        setMsg(error.response.data);
        setMsgStatus('fail');
      } else if (error.response.data.message === 'jwt expired') {
        setMsg('');
        setMsgStatus('');
        navigate('/login');
      } else {
        console.log(error.response);
        setLoader(false);
        setMsg(error.response.data.message);
        setMsg('fail');
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
        setMsg('');
      }, 1500);

      return () => clearTimeout(timer);
    },
    [msg, setMsg]
  );
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
