import React, { Component } from "react";

//stateless functional Component

const NavBar = ({ totalCounters }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Amazing Finds
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">
            Gold Calculator <span class="sr-only">(current)</span>
          </a>
          <a class="nav-item nav-link" href="#">
            Features
          </a>
          <a class="nav-item nav-link" href="#">
            Pricing
          </a>
          <a class="nav-item nav-link disabled" href="#">
            Disabled
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
