import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import Axios from 'axios';

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

  const handleUserUpdate = async (email, username, password) => {
    try {
      // setLoading(true);
      const response = await Axios.patch(
        'http://localhost:8000/api/user/Update_me',
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
        console.log(data);
        setMsg('Changes saved successfully');
        setMsgStatus('success');
        dispatch({ type: 'handleUserUpdate', payload: { data } });
      } else {
        throw new Error('Something went wrong. Please try again later!');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        setMsg('Something went really wrong. Try again!');
        setMsgStatus('fail');
        // setLoading(false);
      } else if (error.response && error.response.status === 429) {
        setMsg('Too many requests. Try again later!');
        setMsgStatus('fail');
        // setLoading(false);
      } else {
        setMsg(error.response.message);
        setMsgStatus('fail');
        // setLoading(false);
      }
    } finally {
      // setLoading(false);
    }
  };

  async function login(email, password) {
    try {
      if (!email || !password) {
        setMsg('Empty field!');
        setMsgStatus('fail');
      }
      const response = await Axios.post(
        'http://localhost:8000/api/user/login',
        {
          email,
          password,
        }
      );

      const { user, token } = response.data;
      console.log(response);
      if (response.status !== 200) {
        setMsg(response.data.message);
        setMsgStatus('fail');
        throw new Error(response.data.message);
      } else {
        setMsg(response.data.message);
        setMsgStatus('success');
        console.log(user, token);
        dispatch({ type: 'login', payload: { user, token } });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 500) {
        setMsg('Something went really wrong. Please try again!');
        setMsgStatus('fail');
      } else if (error.response.status === 429) {
        setMsg('Too many requests. Please try again later!');
        setMsgStatus('fail');
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
      }
      console.error('Login failed:', error);
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  async function signUp(email, password, username) {
    try {
      if (!email || !password || !username) {
        setMsg('Empty field!');
        setMsgStatus('fail');
      }
      const response = await Axios.post(
        'http://localhost:8000/api/user/register',
        {
          email,
          username,
          password,
        }
      );
      if (response.status !== 'success') throw new Error(response.data.message);
      const { userProfile, token } = response.data;
      if (response.status !== 200) {
        setMsg(response.data.message);
        setMsgStatus('fail');
        throw new Error(response.data.message);
      } else {
        setMsg(response.data.message);
        setMsgStatus('success');
        console.log(user, token);
        dispatch({ type: 'signUp', payload: { userProfile, token } });
      }
    } catch (error) {
      if (error.response.status === 500) {
        setMsg('something really Wrong. Try again!');
        setMsgStatus('fail');
      } else if ((error.response.status = 429)) {
        setMsg('Too many request. Try again later!');
        setMsgStatus('fail');
      } else {
        setMsg(error.response.data.message);
        setMsgStatus('fail');
      }
      console.error('Signup failed:', error.message);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
