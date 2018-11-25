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
    let convRate = 1;

    if (fields.units === "g") {
      convRate = 0.0321507;
    } else if (fields.units === "oz") {
      convRate = 0.911458;
    } else if (fields.units === "dwt") {
      convRate = 0.05;
    }

    let weight = fields.weight * convRate;
    let content = fields.karats / 24;
    console.log("Weight in troy oz:", weight);
    console.log("Gold content: ", content * 100, "%");

    let total = weight * content * goldPrice;
    console.log("Price of Gold: ", total);

    this.setState({ total });
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
