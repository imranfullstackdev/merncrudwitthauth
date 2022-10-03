import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-link">
          <NavLink to="/">Login</NavLink>
        </div>
        <div className="nav-link">
          <NavLink to="/Register">Register</NavLink>
        </div>
        <div className="nav-link">
          <NavLink to="/View">View</NavLink>
        </div>
        <div className="nav-link">
          <NavLink to="/Logout">Logout</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
