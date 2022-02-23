import React, { createContext, useReducer, useEffect } from 'react';
import { api } from '../utils';

export const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  register: null,
  logout: null,
  login: null,
  user: null
});


const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  authenticate: null,
  register: null,
  logout: null,
  login: null,
  user: null
}

const authReducer = (state, action) => {
  switch (action.type) {

    case 'initialize':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };

    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'register':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
}


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Get profile if user is authenticated
    const initialize = async () => {
      try {
        const token = localStorage.getItem('token')

        if (token) {
          const response = await api.get('/user/profile');

          dispatch({
            type: 'initialize',
            payload: {
              isAuthenticated: true,
              user: response.data
            },
          });
        } else {
          dispatch({
            type: 'initialize',
            payload: {
              isAuthenticated: false,
              user: null
            },
          });
        }
      } catch (err) {
        localStorage.removeItem('token');
        dispatch({
          type: 'initialize',
          payload: {
            isAuthenticated: false,
            user: null
          },
        });
      }
    };

    initialize();
  }, [])

  // Handle user login
  const login = async (username, password) => {
    const response = await api.post('/user/login', {
      password,
      username
    });


    const { user, token } = response.data;
    localStorage.setItem('token', token)

    dispatch({
      type: 'login',
      payload: {
        user
      }
    });
  };

  // Handle user registration
  const register = async (username, password) => {
    const response = await api.post('/user/register', {
      username,
      password,
    });

    const { user, token } = response.data;
    await localStorage.setItem('token', token)

    dispatch({
      type: 'register',
      payload: {
        user
      }
    });
  };

  // Handle user logout
  const logout = async () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'logout'
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}