import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * NavBar component allows the user to navigate between the gold calculator, silver calculator, and the calculations page
 */
class NavBar extends Component {
  state = {
    activeTab: ""
    /**
     * activeTab keeps track of which page tab should be active depending on what page the user is on
     * "0" for the home page gold calculator, "1" for the silver calculator, and "2" for the Calculations
     */
  };
  componentDidMount() {
    /**
     * the URL is retrieved and the activeTab state is set based off what page the user is currently on
     */

    if (window.location.href.search("silverform") !== -1) {
      this.setState({
        activeTab: "1"
      });
    } else if (window.location.href.search("calculations") !== -1) {
      this.setState({
        activeTab: "2"
      });
    } else {
      this.setState({
        activeTab: "0"
      });
    }
  }

  handleSelect = activeTab => {
    /** when someone changes the tab the activeTab state has to be set */
    this.setState({
      activeTab
    });
  };

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li
            role="presentation"
            className={this.state.activeTab === "0" ? "active" : ""}
            onClick={() => this.handleSelect("0")}
          >
            <Link to={process.env.PUBLIC_URL + "/"}>Gold Calculator</Link>
          </li>
          <li
            role="presentation"
            className={this.state.activeTab === "1" ? "active" : ""}
            onClick={() => this.handleSelect("1")}
          >
            <Link to={process.env.PUBLIC_URL + "/silverform"}>
              Silver Calculator
            </Link>
          </li>
          <li
            role="presentation"
            className={this.state.activeTab === "2" ? "active" : ""}
            onClick={() => this.handleSelect("2")}
          >
            <Link to={process.env.PUBLIC_URL + "/calculations"}>
              Calculations
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
