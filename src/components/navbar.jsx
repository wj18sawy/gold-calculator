import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <NavLink to="/goldform" class="nav-link">
          {/*using link tag to prevent a new server request*/}
          Gold Calculator
        </NavLink>
      </li>
      <li class="nav-item" class="nav-link">
        <NavLink to="/silverform">Silver Calculator</NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
