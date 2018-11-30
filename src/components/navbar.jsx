import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    activeTab: ""
  };

  handleSelect = activeTab => {
    console.log("setting", activeTab);
    this.setState({
      activeTab
    });
  };

  whatTab = () => {
    console.log("whattab called");
    if (window.location.href.search("silverform")) {
      this.setState({
        activeTab: "1"
      });
    } else if (window.location.href.search("calculations")) {
      this.setState({
        activeTab: "2"
      });
    } else {
      this.setState({
        activeTab: "0"
      });
    }
    console.log("whattab called2");
  };

  render() {
    return (
      <div>
        <ul class="nav nav-tabs">
          <li
            role="presentation"
            class={this.state.activeTab == 0 ? "active" : ""}
            onClick={() => this.handleSelect("0")}
          >
            <NavLink to="/">Gold Calculator</NavLink>
          </li>
          <li
            role="presentation"
            class={this.state.activeTab == 1 ? "active" : ""}
            onClick={() => this.handleSelect("1")}
          >
            <NavLink to="/silverform">Silver Calculator</NavLink>
          </li>
          <li
            role="presentation"
            class={this.state.activeTab == 2 ? "active" : ""}
            onClick={() => this.handleSelect("2")}
          >
            <NavLink to="/calculations">Calculations</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
