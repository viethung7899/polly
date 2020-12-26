import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const auth = axios.create({
  baseURL: 'http://localhost:5000/auth',
  responseType: 'json',
});

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const logIn = async (username, password) => {
    console.log('Logging in...');
    return auth
      .post('/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log('OK');
        console.log(res.data.token);
        if (res.status === 200) setToken(res.data.token);
      });
  };

  const register = async (username, password) => {
    return auth
      .post('/register', {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) setToken(res.data.token);
      });
  };

  const logOut = () => {
    setToken('');
    localStorage.clear();
  };

  useEffect(() => {
    const data = localStorage.getItem('token');
    if (data) setToken(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('token', token);
  });

  return (
    <AuthContext.Provider value={{ token, logIn, logOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
