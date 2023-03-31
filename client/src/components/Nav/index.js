import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import navPicture from "../../assets/navPicture.jpg";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CATEGORY } from "../../utils/actions";

function Nav() {
  const [state, dispatch] = useStoreContext();

  const resetCategory = () => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: "",
    });
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
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
              <button onClick={resetCategory} className="bg-white">
                <span role="img" aria-label="air-plane">
                  ✈️
                </span>
                Getaway
              </button>
            </Link>
          </h1>
          {showNavigation()}
        </div>
      </nav>
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${navPicture})`,
          backgroundRepeat: "repeat-x",
          height: "70vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      ></div>
    </header>
  );
}

export default Nav;
