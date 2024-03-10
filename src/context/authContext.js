import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import Axios from 'axios';
import { BASEURLDEV, BASEURLPROD } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

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
      throw new Error('No action was found');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [msg, setMsg] = useState('');
  const [msgStatus, setMsgStatus] = useState('');
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState('');
  const [isSucess, setIsSuccess] = useState(false);

  const handleUserUpdate = async (email, username, password) => {
    try {
      // setLoading(true);
      const response = await Axios.patch(
        `${BASEURLPROD}/api/user/Update_me`,
        {
          email,
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.data.status === 'SUCCESS') {
        const { data } = response.data;
        const userToBeStored = {
          ...data,
          password: undefined,
          _id: undefined,
          resetPasswordToken: undefined,
          resetTimeExp: undefined,
        };
        setMsg('Changes saved successfully');
        setMsgStatus('success');
        localStorage.setItem('user', JSON.stringify(userToBeStored));
        dispatch({ type: 'handleUserUpdate', payload: { data } });
      } else {
        throw new Error('Something went wrong. Please try again later!');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        setMsg('Something went really wrong. Try again!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Try again later!');
        setMsgStatus('fail');
        setLoader(false);
      } else {
        setMsg(error.response.message);
        setMsgStatus('fail');
        setLoader(false);
      }
    } finally {
      setLoader(false);
    }
  };

  async function login(email, password) {
    try {
      if (!email || !password) {
        setMsg('Empty field!');
        setMsgStatus('fail');
      }
      const response = await Axios.post(`${BASEURLPROD}/api/user/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      const userToBeStored = {
        ...user,
        password: undefined,
        _id: undefined,
        resetPasswordToken: undefined,
        resetTimeExp: undefined,
      };
      console.log(response);
      if (response.status !== 200) {
        setMsg(response.data.message);
        setMsgStatus('fail');
        setLoader(false);
        throw new Error(response.data.message);
      } else {
        console.log(response);
        setMsg(response.data.message);
        setMsgStatus('success');
        setIsSuccess(true);
        const isLoggedIn = true;
        const Authenticated = localStorage.setItem('auth', isLoggedIn);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userToBeStored));
        dispatch({ type: 'login', payload: { user, token } });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      if (error.response.status === 500) {
        setMsg('Something went really wrong. Please try again!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response.status === 429) {
        setMsg('Too many requests. Please try again later!');
        setMsgStatus('fail');
        setLoader(false);
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
        setLoader(false);
      }
      console.error('Login failed:', error);
    } finally {
      setLoader(false);
    }
  }

  function logout() {
    setLoader(false);
    dispatch({ type: 'logout' });
  }

  async function signUp(email, password, username) {
    try {
      if (!email || !password || !username) {
        setMsg('Empty field!');
        setMsgStatus('fail');
        return;
      }
      const response = await Axios.post(`${BASEURLPROD}/api/user/register`, {
        email,
        username,
        password,
      });
      console.log(response);

      if (response.status !== 201) {
        setMsg(response.data.message || 'Something went wrong');
        setMsgStatus('fail');
        setLoader(false);
        return;
      } else {
        const { userProfile, token } = response.data;
        setMsg(response.data.message);
        setMsgStatus('success');
        setIsSuccess(true);
        dispatch({ type: 'signUp', payload: { userProfile, token } });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        setMsg('Something went wrong. Please try again!');
        setMsgStatus('fail');
        setLoader(false);
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Please try again later!');
        setMsgStatus('fail');
        setLoader(false);
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
        setLoader(false);
      }
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
        msg,
        setMsg,
        msgStatus,
        setMsgStatus,
        handleUserUpdate,
        loader,
        setLoader,
        title,
        setTitle,
        isSucess,
        setIsSuccess,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
