import React, { Component, createContext, useReducer } from 'react';
import authReducer from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [authenticated, dispatch] = useReducer(authReducer, false);

  return <AuthContext.Provider value={{authenticated, dispatch}}>
    {children}
  </AuthContext.Provider>
}

export default AuthContextProvider;
