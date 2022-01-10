import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);
    showButton();
    return () => window.removeEventListener("resize", showButton);
  }, []);

  return (
    <nav className="navbar">
      {/* <div className="navbar-container"> */}
      <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
        <span className="main-logo">
          <i className="fa-solid fa-igloo" />
        </span>
        <span className="main-name">{"Sarry"}</span>
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        {/* <li className="nav-item">
            <Link
              to="/services"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
          </li> */}
        <li className="nav-item">
          <Link to="/todolist" className="nav-links" onClick={closeMobileMenu}>
            To Do List
          </Link>
        </li>
        <li>
          <Link
            to="/sign-up"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign Up
          </Link>
        </li>
      </ul>
      {/* {button && <Button buttonStyle="btn--outline">PROJECTS</Button>} */}
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
