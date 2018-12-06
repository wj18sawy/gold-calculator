import React, { Component } from "react";
import NavBar from "./components/navbar";
import GoldForm from "./components/goldform";
import SilverForm from "./components/silverform";
import Calculations from "./components/calculations";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <NavBar />
          <Switch>
            <Route exact path={"/"} component={GoldForm} />
            <Route path={"/silverform"} component={SilverForm} />
            <Route path={"/calculations"} component={Calculations} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
