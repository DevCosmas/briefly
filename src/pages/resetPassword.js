import FormPage from '../lib/form';
import Button from '../components/button';
import style from '../utils/btn.style';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import ShowAlert from '../components/showAlert';
const formBtnStyle = {
  ...style,
  width: '90%',
  marginLeft: '0',
};

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const { isAuthenticated, setMsg, msg, setMsgStatus, msgStatus } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState();

  async function resetPassword(password, confirmPassword) {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/user/reset_Password/${resetToken}`,
        {
          password,
          confirmPassword,
        }
      );

      console.log(resetToken);
      if (response.status === 200) {
        console.log(response);
        setLoader(true);
        const { message } = response.data;
        console.log(response.data);
        setMsg(message);
        setMsgStatus('success');
        setLoader(false);
        navigate('/login');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error.response);

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
        setMsgStatus('fail');
      }
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
  async function handleSubmit(event) {
    event.preventDefault();
    await resetPassword(password, confirmPassword);
  }

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
          <label>Set New Password</label>
          <input
            type="password"
            placeholder="password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button className={'form-btn'}>
            {loader ? 'Processing...' : 'Submit'}
          </Button>
        </form>
      </main>
    </FormPage>
  );
}

export default ResetPasswordPage;
