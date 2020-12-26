import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, logOut } = useContext(AuthContext);
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);

  const handleButton = (path) => {
    history.push(path);
    setIsActive(false);
  };

  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div
          className="navbar-item"
          onClick={() => handleButton('/')}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-poll-h fa-2x has-text-primary"></i>
          <h1 className="title is-4 ml-2 has-text-primary">Polly</h1>
        </div>

        <a
          onClick={() => setIsActive(!isActive)}
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-end">
          {token && (
            <div className="navbar-item">
              <div className="buttons">
                <Button
                  title="Log out"
                  type="is-danger is-outlined"
                  action={() => {
                    logOut();
                    handleButton('/login');
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
