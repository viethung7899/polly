import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const auth = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
  responseType: 'json',
});

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const login = (username, password) => {
    return auth
      .post('/login', {
        username: username,
        password: password,
      })
      .then((res, reject) => {
        if (res.status === 200) setToken(res.data.token);
        else reject(new Error('Something is wrong'));
      });
  };

  const register = async (name, username, password) => {
    return auth
      .post('/register', {
        name,
        username,
        password,
      })
      .then((res, reject) => {
        if (res.status === 200) setToken(res.data.token);
        else reject(new Error('Something is wrong'));
      });
  };

  const logOut = () => {
    setToken('');
    localStorage.clear();
  };

  // Persist data
  useEffect(() => {
    // console.log('Getting token in auth context');
    const data = localStorage.getItem('token');
    if (data) setToken(data);
  }, []);

  useEffect(() => {
    // console.log('Saving token in auth context');
    localStorage.setItem('token', token);
  });

  return (
    <AuthContext.Provider value={{ token, login, logOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
