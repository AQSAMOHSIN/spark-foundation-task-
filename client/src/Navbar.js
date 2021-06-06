import React, { useState } from "react";
import logo from "./images/aqsa2.png";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="logo" alt="logo" />
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div
          className={`${
            showLinks ? "links-container show-container" : "links-container"
          }`}
        >
          <ul className="links">
            <li onClick={toggleLinks}>
              <Link to="/">HOME</Link>
            </li>
            <li onClick={toggleLinks}>
              <Link to="/customers">CUSTOMERS</Link>
            </li>
            <li onClick={toggleLinks}>
              <Link to="/trasactions">TRANSACTIONS</Link>
            </li>
          </ul>
        </div>

        <button className="btn signin-btn">Sign in</button>
      </div>
    </nav>
  );
};
export default Navbar;
