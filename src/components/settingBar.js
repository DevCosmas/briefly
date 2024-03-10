import { useState } from 'react';
import Button from './button';
import { useAuth } from '../context/authContext';

function Setting({ settingActive, handleCancel }) {
  const USER = localStorage.getItem('user');
  const user = JSON.parse(USER);
  console.log(user);
  const { handleUserUpdate, loader, setLoader } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    await handleUserUpdate(email, username);
    return handleCancel();
  };

  return (
    <div
      className={`setting-wrapper ${
        settingActive ? 'setting-wrapper-active' : ''
      }`}>
      <form
        className="login-form setting-form"
        onSubmit={handleSubmit}>
        <span
          className="setting-cancel-btn"
          onClick={handleCancel}>
          x
        </span>
        <label className="setting-heading">Account Setting</label>
        <input
          type="email"
          // placeholder={`${user.email}`}
          className="form-input setting-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          // placeholder={`${user.username}`}
          className="form-input setting-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button className={'form-btn'}>
          {loader ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}

export default Setting;
