import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState(true);
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form change
  const handleFormChange = (e) => {
    e.preventDefault();
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
  };

  // Handle validity
  const [valid, setValid] = useState(false);
  useEffect(() => {
    // effect
    let isValidInput =
      input.username.trim().length > 0 && input.password.trim().length > 0;
    if (!loginMode)
      isValidInput = isValidInput && input.password === input.confirmPassword;
    setValid(isValidInput);
    return () => {
      setValid(false);
    };
  }, [input]);

  // Handle submit
  const history = useHistory();
  const handleSubmit = () => {
    dispatch({ type: 'LOG_IN' });
    history.push('/');
  };

  return (
    <section className="hero is-primary is-bold is-fullheight-with-navbar">
      <div className="hero-body">
        {/* The title */}
        <div className="container columns is-centered">
          <div className="column is-half ">
            <h1 className="title is-1">{loginMode ? 'Log in' : 'Sign up'}</h1>
            <div className="has-background-white p-4">
              {/* Username field */}
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleFormChange}
                    value={input.username}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>
              {/* Pasword field */}
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleFormChange}
                    value={input.password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
              </div>
              {/* Pasword field */}
              {!loginMode && (
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Re-enter password"
                      name="confirmPassword"
                      onChange={handleFormChange}
                      value={input.confirmPassword}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                </div>
              )}
              {/* Buttons */}
              <div className="buttons is-centered">
                <Button
                  title={loginMode ? 'Log in' : 'Sign up'}
                  type="is-primary"
                  disabled={!valid}
                  action={handleSubmit}
                />
                <Button
                  title={`Switch to ${!loginMode ? 'log in' : 'sign up'}`}
                  type="is-light"
                  action={() => setLoginMode(!loginMode)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
