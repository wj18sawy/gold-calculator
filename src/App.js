import React, { Component } from "react";
import NavBar from "./components/navbar";
import GoldForm from "./components/goldform";
import SilverForm from "./components/silverform";
import Calculations from "./components/calculations";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      total: 0
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path="/" component={GoldForm} />
          <Route path="/silverform" component={SilverForm} />
          <Route path="/calculations" component={Calculations} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
