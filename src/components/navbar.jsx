import React, { Component } from "react";

//stateless functional Component

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Amazing Finds
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">
            Gold Calculator <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#">
            Features
          </a>
          <a className="nav-item nav-link" href="#">
            Pricing
          </a>
          <a className="nav-item nav-link disabled" href="#">
            Disabled
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
