import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home.page';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import DashBoard from './pages/dashboard';
import axios from 'axios';
import PopUp from './utils/popup';
import EditPage from './pages/modal.page';
import ProtectedRoute from './pages/protectedRoute';
import { useAuth } from './context/authContext';
import HistoryBar from './pages/history';
import Stats from './pages/stat';
import ForgottenPasswordPage from './pages/forgottenpassword';
import ResetPasswordPage from './pages/resetPassword';

function App({ children }) {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const { token, user } = useAuth();

  async function handleEdit(e) {
    e.preventDefault();
    setLoader(true);
  }

  useEffect(() => {
    const controller = new AbortController();
    // let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/findAll?`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        const resData = response.data;
        console.log('api-call:', resData);
        setData((data) => resData.allMyUrl);
        // console.log('api-call:', data);
        // console.log('data from setFn', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // if (token && user && isMounted) {
    //   fetchData();
    // }
    fetchData();
    return function () {
      controller.abort();
    };
  }, [token, user]);
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
          path="signUp"
          element={<SignUpPage />}
        />
        <Route
          path="resetPassword/:resetToken"
          element={<ResetPasswordPage></ResetPasswordPage>}
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
            element={<Stats></Stats>}
          />
          <Route
            path="anywhere"
            element={<p>This is the anywhere route</p>}
          />
        </Route>
        {/* <Route
          path="dashboard"
          element={<DashBoard />}>
          <Route
            index
            element={<HistoryBar data={data}></HistoryBar>}
          />
          <Route
            path="Stats"
            element={<Stats></Stats>}
          />
          <Route
            path="anywhere"
            element={<p>This is the anywhere route</p>}
          />
        </Route> */}
        <Route
          path="reset_token"
          element={<ForgottenPasswordPage></ForgottenPasswordPage>}
        />
      </Routes>
    </>
  );
}

export default App;
