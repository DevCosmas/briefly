import '../App.css';
import React from 'react';
import Button from '../components/button';
import shortner from './../shortner.png';
import { Link } from 'react-router-dom';
import Logo from '../components/logo';
import Header from '../components/header';
import CreateUrlInput from '../components/input';

function HomePage() {
  return (
    <div className="home modal">
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
        <span className="harmbuger-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="hamburger-icon harmbuger"
            id="harmbuger">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </span>
      </Header>
      <main>
        <h1 className="briefly-heading">Shorten your looong URL links :) </h1>
        <p className="brief-intro">
          Briefly is a super efficient tool for shortening <em>url</em> .
          Providing you with variety of features that will help you keep track
          and analyze your link <br /> Super easy and fast.
        </p>

        <CreateUrlInput redirectTo="signUp"></CreateUrlInput>
        <Link to={'/signUp'}>
          <Button className={'shorten-btn'}>Shorten Url Now !</Button>
        </Link>
        <div className="img-wrapper">
          <img
            src={shortner}
            alt="url shorten demo"
            className="img-shortner"
          />
        </div>
      </main>
      <footer>
        <Link to="/signUp">Register</Link> to enjoy unlimited History
      </footer>
    </div>
  );
}
export default HomePage;
