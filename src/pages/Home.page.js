import '../App.css';
import React, { useState } from 'react';
import Button from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/logo';
import Header from '../components/header';
import CreateUrlInput from '../components/input';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import ShowAlert from '../components/showAlert';

function HomePage() {
  const [active, setActive] = useState(false);
  const {
    setTitle,

    msg,
    msgStatus,
    isSucess,
    setIsSuccess,
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => setTitle('Briefly'), [setTitle]);
  function setHarmburgerActive() {
    if (active) {
      return setActive(false);
    } else {
      setActive(true);
    }
  }
  function closeHarmburger() {
    if (active) return setActive(false);
  }
  function handleClick() {
    // setMsg(
    //   'You Need to sign up first. Proceed to login If you have an account already'
    // );
    // setMsgStatus('success');
    // setIsSuccess(true);
  }
  useEffect(
    function () {
      if (isSucess) navigate('/signUp');
    },
    [navigate, isSucess]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          closeHarmburger();
        }
      }
      document.addEventListener('keydown', callback);
      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [closeHarmburger]
  );
  return (
    <div className="home modal">
      {msg !== '' && (
        <ShowAlert
          alertMessage={msg}
          alertType={msgStatus}></ShowAlert>
      )}
      <Header>
        <Logo></Logo>
        <span className="btn-container">
          <Link to={'/login'}>
            <Button className={'login-btn'}>
              <span className="login-icon-wrapper">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="login-icon">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </span>
            </Button>
          </Link>
          <Link to="/signUp">
            <Button className={'btn'}>Sign up</Button>
          </Link>
        </span>
        <span
          className="harmbuger-wrapper"
          onClick={() => setHarmburgerActive()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={`hamburger-icon harmbuger ${active ? 'active' : ''}`}
            id="harmbuger">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
        <div className={`hamburger-content ${active ? 'content-active' : ''}`}>
          <span
            onClick={closeHarmburger}
            className="close-harmbuger">
            X
          </span>
          <Link
            className="h-a"
            to="/login">
            Login
          </Link>
          <Link
            className="h-a"
            to="/signUp">
            Sign Up
          </Link>
        </div>
      </Header>
      <main>
        <h1 className="briefly-heading">Shorten your looong URL links :) </h1>
        <p className="brief-intro">
          Briefly is a super efficient tool for shortening <em>url</em> .
          Providing you with variety of features that will help you keep track
          and analyze your link <br /> Super easy and fast.
        </p>

        {/* <CreateUrlInput
          wrapperClass="wrapperClass"
          redirectTo="signUp"></CreateUrlInput> */}
        <div className={`short-plhol  wrapperClass`}>
          <form className={`plachol-wrapper homepage-input`}>
            <span className="link-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="link-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </span>
            <input
              placeholder="paste your url"
              className="plchol-input"
            />
            <Link>
              <button
                onClick={() => handleClick()}
                className="btn">
                short url now !
              </button>
              {/* <Button className={'btn'}>short url now !</Button> */}
            </Link>
          </form>
        </div>
        <div className="card-wrapper">
          <div className="card animate-left">
            <span className="card-span">
              <h2 className="card-h2 h2-left">Easy to use</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="card-icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </span>
            <p className="card-p">
              The simpler it is , the easier it becomes. Navigating Briefly app
              is as easy as one click per time. User exprience is top notch.
            </p>
          </div>

          <div className="card animate-top">
            <span className="card-span">
              <h2 className="card-h2">Keep Track Of Your Link</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="card-icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                />
              </svg>
            </span>
            <p className="card-p">
              Briefly provides you with the opportunity to keep track of your
              links. The ability to keep track of your Link histories allows you
              to analyze the performance of your links.
            </p>
          </div>
          <div className="card animate-bottom">
            <span className="card-span">
              <h2 className="card-h2">Reliable</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="card-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </span>
            <p className="card-p">
              You can always relie on Briefly to keep the work going on for you.
              It super flexible and easy. Just one click at a time is what you
              need
            </p>
          </div>
          <div className="card animate-right">
            <span className="card-span">
              <h2 className="card- h2-left">Simple Analytic tool</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="card-icon">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
            </span>
            <p className="card-p">
              You can relie on briefly simple analytic tools to make business
              decision regarding your brand or company.
            </p>
          </div>
        </div>
      </main>
      <footer>
        <Link to="/signUp">Register</Link> to enjoy unlimited History
      </footer>
    </div>
  );
}
export default HomePage;
