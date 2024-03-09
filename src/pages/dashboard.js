import { useEffect, useState } from 'react';
import Axios from 'axios';
import Header from '../components/header';
import Logo from '../components/logo';
import Button from '../components/button';
import { useAuth } from '../context/authContext';
import ClipCopy from '../components/clip';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import ShowAlert from '../components/showAlert';
import Setting from '../components/settingBar';
import { BASEURLDEV, BASEURLPROD } from '../utils/constant';

function DashBoard({ data }) {
  const [originalUrlInput, setoriginalUrlInput] = useState();
  const {
    user,
    token,
    msg,
    setMsg,
    msgStatus,
    logout,
    setMsgStatus,
    loader,
    setLoader,
    setTitle,
  } = useAuth();
  const [active, setActive] = useState(false);
  const [settingActive, setSettingActive] = useState(false);
  const [createdLink, setCreatedLink] = useState('');
  const [username, setUsername] = useState(user.name);
  const navigate = useNavigate();

  function handleActiveState() {
    if (active) return setActive(false);
    setActive(true);
  }

  useEffect(() => {
    setUsername(user.username);
  }, [user]);
  useEffect(() => setTitle('dashboard'), [setTitle]);
  async function createShortUrl(originalUrl) {
    try {
      if (!originalUrl || originalUrl === null) {
        setMsg('Provide Long Link');
        setMsgStatus('fail');
        return;
      }
      const response = await Axios.post(
        `${BASEURLPROD}/createUrl`,
        {
          originalUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        console.log(response);
        setMsg(response.data.message);
        setMsgStatus('fail');
        throw new Error(response.data.message);
      } else {
        console.log(response.data);
        const { message, newDoc } = response.data;
        setCreatedLink(newDoc.newUrl);
        setMsg(message);
        setMsgStatus('success');
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        setMsg('Something went really wrong. Try again!');
        setMsgStatus('fail');
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Try again later!');
        setMsgStatus('fail');
      } else if (error.response && error.response.message === 'jwt expired') {
        setMsg('');
        setMsgStatus('');
        navigate('/login');
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
      }
    }
  }

  const handleCreateUrl = async (e) => {
    e.preventDefault();
    await createShortUrl(originalUrlInput);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg('');
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, setMsg]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCreatedLink('');
  //   }, 10000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [createdLink, setCreatedLink]);

  function handleSettingActive() {
    setActive(false);
    setSettingActive(true);
  }
  function cancelSettingActive() {
    setSettingActive(false);
  }
  async function handleLogout() {
    await logout();
    navigate('/login');
    setLoader(false);
  }
  return (
    <div className="home">
      {msg !== '' && (
        <ShowAlert
          alertMessage={msg}
          alertType={msgStatus}></ShowAlert>
      )}

      <Header>
        <Logo className={'dashboard-logo'} />

        <div className="Profile">
          <span
            onClick={() => handleActiveState()}
            className={`username-wrapper ${active ? 'active' : ''}`}>
            <p className="username-wrapper-p"> Hi {username}</p>
          </span>
          <span className="user-content-disp">
            <span className="list-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="user-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <li
                className="user-list"
                onClick={handleSettingActive}>
                Setting
              </li>
            </span>
            <span className="list-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="user-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <Link
                className="user-list-link"
                to={'/reset_token'}>
                <li className="user-list">Forgotten password</li>
              </Link>
            </span>
            <span className="list-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="user-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <li
                className="user-list"
                onClick={() => handleLogout()}>
                Logout
              </li>
            </span>
          </span>
        </div>
      </Header>
      <div className="inputWrapper">
        <div className="short-plhol short-phol2">
          <form
            className="expand"
            id="exp-width"
            onSubmit={(e) => handleCreateUrl(e)}>
            <span className="link-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="link-icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </span>
            <input
              placeholder="paste your url"
              className="plchol-input  create-link-btn"
              onChange={(e) => setoriginalUrlInput(e.target.value)}
            />
            <Button className="btn btn-dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="scissor-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
                />
              </svg>
            </Button>
          </form>
          <button
            onClick={(e) => handleCreateUrl(e)}
            className="btn btn-disp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="scissor-icon">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
              />
            </svg>
          </button>

          {createdLink !== '' && (
            <span className="created-wrapper">
              <p className="newCreate-link">{createdLink}</p>
              <p className="newlink-copy-icon">
                <ClipCopy text={createdLink}></ClipCopy>
              </p>
            </span>
          )}
        </div>
      </div>

      <article className="tab">
        <span className="tab-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="tab-icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <NavLink to="/dashboard">
            <span className="tab-link">History</span>
          </NavLink>
        </span>
        <span className="tab-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="tab-icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>

          <NavLink to="/dashboard/stats">
            <span className="tab-link"> Statistics</span>
          </NavLink>
        </span>
        <span className="tab-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="tab-icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>

          <NavLink to="/dashboard/click_stream">
            <span className="tab-link">Click streams</span>
          </NavLink>
        </span>
        <span className="tab-wrapper tab-disp">
          <NavLink
            className="tab-link"
            to={'/dashboard'}>
            <span className="tab-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tab-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </NavLink>
        </span>
        <span className="tab-wrapper tab-disp">
          <NavLink to={'/dashboard/stats'}>
            <span className="tab-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tab-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </span>
          </NavLink>
        </span>
        <span className="tab-wrapper tab-disp">
          <NavLink to={'/dashboard/Click_stream'}>
            <span className="tab-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="tab-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </span>
          </NavLink>
        </span>
      </article>
      <Outlet></Outlet>
      <Setting
        settingActive={settingActive}
        handleCancel={cancelSettingActive}></Setting>
    </div>
  );
}

export default DashBoard;
