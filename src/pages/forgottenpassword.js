import FormPage from '../lib/form';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ShowAlert from '../components/showAlert';
import axios from 'axios';
import { BASEURLDEV, BASEURLPROD } from '../utils/constant';

function ForgottenPasswordPage() {
  const {
    msg,
    msgStatus,
    setMsgStatus,
    setMsg,

    setTitle,
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  async function forgettenpassword(email) {
    try {
      const response = await axios.post(
        `${BASEURLPROD}/api/user/forget_Password`,
        {
          email,
        }
      );
      if (response.status === 200) {
        const { message } = response.data;
        const successful = true;
        setMsg(message);
        setMsgStatus('success');
        return successful;
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
        setLoader(false);
        setMsg(error.response.data.message);
        setMsgStatus('fail');
      }
    }
  }

  // async function handleForgettenPassword(event) {
  //   event.preventDefault();
  //   setLoader(true);
  //   await forgettenpassword(email);
  //   if (!isSucess) {
  //     return;
  //   } else {
  //     setLoader(false);
  //     navigate('/resetPassword');
  //   }
  // }
  async function handleForgettenPassword(event) {
    event.preventDefault();
    setLoader(true);
    try {
      const isSuccess = await forgettenpassword(email);
      navigate('/resetPassword');
      if (!isSuccess) {
        return;
      }
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setLoader(false);
    }
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
  useEffect(() => setTitle('Forgot_password'), [setTitle]);
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
