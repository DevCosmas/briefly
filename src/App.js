import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home.page';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import DashBoard from './pages/dashboard';
import axios from 'axios';
import ProtectedRoute from './pages/protectedRoute';
import { useAuth } from './context/authContext';
import HistoryBar from './pages/history';
import Stats from './pages/stat';
import ForgottenPasswordPage from './pages/forgottenpassword';
import ResetPasswordPage from './pages/resetPassword';
import ErrorPage from './pages/404';
import ClipCopy from './components/clip';
import { BASEURLDEV, BASEURLPROD } from './utils/constant';

function App({ children }) {
  const [data, setData] = useState([]);
  const { token, user, title, setTitle } = useAuth();
  const tokenFromLocalStorage = localStorage.getItem('token');

  useEffect(
    function () {
      document.title = `Briefly | ${title}`;
      return function () {
        document.title = `${
          document.title && title === 'Briefly'
            ? 'Briefly'
            : `Briefly | ${title}`
        }`;
      };
    },
    [title, setTitle]
  );
  useEffect(
    function () {
      const controller = new AbortController();

      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASEURLPROD}/findAll?`, {
            headers: {
              Authorization: `Bearer ${tokenFromLocalStorage || token}`,
            },
            signal: controller.signal,
          });
          const resData = response.data;
          console.log(resData);
          const { data: dataFromApi } = resData;
          console.log('resdata', resData);
          setData(dataFromApi);
        } catch (error) {
          console.log('Error fetching data:', error.response);
        }
      };

      fetchData();
      return function () {
        controller.abort();
      };
    },
    [token, user, setData, data, tokenFromLocalStorage]
  );
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="login"
          element={<LoginPage />}
        />

        <Route
          path="clip"
          element={<ClipCopy />}
        />
        <Route
          path="signUp"
          element={<SignUpPage />}
        />
        <Route
          path="resetPassword/:resetToken"
          element={<ResetPasswordPage></ResetPasswordPage>}
        />
        <Route
          path="reset_token"
          element={<ForgottenPasswordPage></ForgottenPasswordPage>}
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }>
          <Route
            index
            element={<HistoryBar data={data}></HistoryBar>}
          />
          <Route
            path="Stats"
            element={<Stats data={data}></Stats>}
          />
          <Route
            path="Click_stream"
            element={<h2 className="Click_stream_h2">We are working on it</h2>}
          />
        </Route>
        <Route
          path="*"
          element={<ErrorPage></ErrorPage>}
        />
      </Routes>
    </>
  );
}

export default App;
