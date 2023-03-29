import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/orderHistory" className="nav-link">
              My Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <h1>
            <Link to="/" className="navbar-brand">
              <span role="img" aria-label="air-plane">✈️</span>
              Getaway
            </Link>
          </h1>
          {showNavigation()}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
