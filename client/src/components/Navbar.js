import React from 'react';
import poll from '../poll.svg'

const Navbar = () => {
  return (
    <nav
      className="bd-navbar navbar has-shadow is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src={poll}
            alt="Polly logo"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
