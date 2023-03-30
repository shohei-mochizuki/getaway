import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className=" d-flex justify-content-between cta-container z-1 p-5 rounded-3 position-absolute bottom-0 start-50 translate-middle flex">
        <h2>Wanna Try?</h2>

        <Link to="/login">
          <button
            className="btn rounded"
            style={{ "background-color": "#f3a847" }}
          >
            login now
          </button>
        </Link>
      </div>
      <div className="made-by-container" style={{ marginTop: "100px" }}>
        <div className=" d-flex justify-content-between">
          <h2>
            <strong>Made by:</strong>
          </h2>
          <ul>
            <a
              className="info"
              href="https://github.com/mojsun/Mini-challenge"
              class="info"
            >
              Moji
            </a>

            <a href="https://github.com/shohei-mochizuki" class="info">
              shohei
            </a>
            <a href="https://github.com/shaynefw" class="info">
              Shayne
            </a>
          </ul>
        </div>
        <div>
          <div className="social-media">
            <a href="#" className="info">
              <FaGithub size={40} />
            </a>
            <a href="#" className="info">
              <FaInstagram size={40} />
            </a>
            <a href="#" className="info">
              <FaLinkedin size={40} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
