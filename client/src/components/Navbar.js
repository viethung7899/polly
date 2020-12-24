import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import logo from '../poll.svg';

const Navbar = () => {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div
          className="navbar-item"
          onClick={() => {
            history.push('/');
            setIsActive(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          <img src={logo} alt="Polly" width="50" height="50" />
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
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="buttons">
              <Button
                title="Vote"
                type="is-warning"
                icon="fas fa-vote-yea"
                action={() => {
                  history.push('/vote');
                  setIsActive(false);
                }}
              />
              <Button
                title="Create new poll"
                type="is-info"
                icon="fas fa-plus"
                action={() => {
                  history.push('/new');
                  setIsActive(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
