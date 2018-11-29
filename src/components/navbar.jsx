import React, { Component } from "react";

const NavBar = () => {
  return (
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link" href="/goldform">
          {" "}
          Gold Calculator
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/silverform">
          {" "}
          Silver Calculator
        </a>
      </li>
    </ul>
  );
};

export default NavBar;
