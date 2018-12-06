import React, { Component } from "react";
import NavBar from "./components/navbar";
import GoldForm from "./components/goldform";
import SilverForm from "./components/silverform";
import Calculations from "./components/calculations";
import { BrowserRouter, Route, hashHistory } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter history="hashHistory">
        <div>
          <NavBar />
          <Route
            path={process.env.PUBLIC_URL + "gold-calculator/"}
            component={GoldForm}
          />
          <Route
            path={process.env.PUBLIC_URL + "gold-calculator/silverform"}
            component={SilverForm}
          />
          <Route
            path={process.env.PUBLIC_URL + "gold-calculator/calculations"}
            component={Calculations}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
