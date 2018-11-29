import React, { Component } from "react";
import NavBar from "./components/navbar";
import GoldForm from "./components/goldform";
import SilverForm from "./components/silverform";
import TextField from "@material-ui/core/TextField";
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
    console.log(this.state.items);
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route path="/goldform" component={GoldForm} />
          <Route path="/silverform" component={SilverForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
