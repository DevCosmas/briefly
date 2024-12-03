import {
  createContext,
  useContext,
  useReducer,
  useNavigate,
  useState,
} from 'react';
import Axios from 'axios';
import { BASEURLDEV } from '../utils/constant';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleServerError } from '../lib/errorHandler';
import { toastProp } from '../lib/toast_prop';

const AuthContext = createContext();
const tokenFromCookies = Cookies.get('token');
const userFromCookies = Cookies.get('user');

const initialState = {
  user: null,
  isAuthenticated: false,
  token: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'signUp':
      return {
        ...state,
        user: action.payload.userProfile,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false, token: '' };
    case 'handleUserUpdate':
      return {
        ...state,
        user: action.payload.data,
      };
    default:
      throw new Error('No action found');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [loader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState('');

  // Update user info
  const handleUserUpdate = async (email, username) => {
    try {
      const response = await Axios.patch(
        `${BASEURLDEV}/api/user/Update_me`,
        { email, username },
        {
          headers: {
            Authorization: `Bearer ${token || tokenFromCookies}`,
          },
        }
      );

      if (response.data.status === 'SUCCESS') {
        const { data } = response.data;
        const userToBeStored = {
          ...user,
          ...data,
          password: undefined,
          _id: undefined,
          resetPasswordToken: undefined,
        };

        Cookies.set('user', JSON.stringify(userToBeStored));
        toast.success('Changes saved successfully', { ...toastProp });
        dispatch({ type: 'handleUserUpdate', payload: { data } });
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      const { response } = error;
      handleServerError(response.status, response.data.message);
    } finally {
      setLoader(false);
    }
  };

  // Login
  async function login(email, password) {
    Cookies.remove('user');
    Cookies.remove('token');
    try {
      if (!email || !password) {
        toast.error('Empty field!');
        return;
      }

      const response = await Axios.post(`${BASEURLDEV}/api/user/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      const { exp } = jwtDecode(token);

      const userToBeStored = {
        ...user,
        password: undefined,
        _id: undefined,
        resetPasswordToken: undefined,
        isLoggedIn: true,
        expTime: exp,
        token,
      };

      if (!response || response.status !== 200) {
        throw new Error('Bad network connection');
      } else {
        // console.log(response);
        Cookies.set('token', token, { expires: exp / (24 * 60 * 60) });
        Cookies.set('user', JSON.stringify(userToBeStored));
        toast.success('Logged in successfully', { ...toastProp });
        dispatch({ type: 'login', payload: { user, token } });
        setIsSuccess(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      const { response } = error;
      handleServerError(response.status, response.data.message);
    } finally {
      setLoader(false);
    }
  }

  // Logout
  function logout() {
    Cookies.remove('user');
    Cookies.remove('token');
    toast.success('Logged out successfully');
    dispatch({ type: 'logout' });
  }

  // Sign-up
  async function signUp(email, password, username) {
    Cookies.remove('user');
    Cookies.remove('token');
    try {
      if (!email || !password || !username) {
        toast.error('Empty field!');
        return;
      }

      const response = await Axios.post(`${BASEURLDEV}/api/user/register`, {
        email,
        username,
        password,
      });

      if (response.status !== 201) {
        throw new Error(response.data.message || 'Something went wrong');
      } else {
        const { userProfile, token } = response.data;
        toast.success('Registration successful', { ...toastProp });
        dispatch({ type: 'signUp', payload: { userProfile, token } });
      }
    } catch (error) {
      const { response } = error;
      handleServerError(response.status, response.data.message);
    } finally {
      setLoader(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        login,
        signUp,
        logout,
        handleUserUpdate,
        loader,
        setLoader,
        isSuccess,
        setIsSuccess,
        setTitle,
        title,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
