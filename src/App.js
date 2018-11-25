import React, { Component } from "react";
import NavBar from "./components/navbar";
import Inputs from "./components/inputs";
import Form from "./components/form";
import "./App.css";

class App extends Component {
  state = {
    fields: {},
    total: 0
  };

  onSubmit = fields => {
    this.setState({ fields });
    console.log("App component got: ", fields);
    this.calculate(fields);
  };

  calculate = fields => {
    const goldPrice = 1222.6;

    console.log("yo", fields.weight);
  };

  render() {
    return (
      <div>
        <NavBar />
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <p> {JSON.stringify(this.state.fields, null, 2)} </p>
        <p> Total gold value is: ${this.state.total} </p>
      </div>
    );
  }
}

export default App;
