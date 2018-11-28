import React, { Component } from "react";
import NavBar from "./components/navbar";
import Inputs from "./components/inputs";
import Form from "./components/form";
import TextField from "@material-ui/core/TextField";

import "./App.css";

class App extends Component {
  state = {
    fields: {},
    total: 0
  };

  onSubmit = fields => {
    this.setState({ fields });
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

    let total = (weight * content * goldPrice).toFixed(2);
    console.log("Price of Gold: ", total);

    this.formatter(total);
  };

  formatter = total => {
    let totalStr = total.toString();
    let number = totalStr.slice(0, totalStr.length - 3);
    let decimal = totalStr.slice(totalStr.length - 3);

    let count = 0;
    for (let i = number.length - 1; i > 0; i--) {
      count++;
      if (count === 3) {
        count = 0;
        number = number.slice(0, i) + "," + number.slice(i);
      }
    }

    let newTotal = number + "" + decimal;
    console.log("After formatting: $", newTotal);

    this.setState({ total: newTotal });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <TextField
          id="filled-read-only-input"
          label="Total Gold Value:"
          value={"$" + this.state.total}
          className={this.state.textField}
          margin="normal"
          InputProps={{
            readOnly: true
          }}
          variant="filled"
        />
      </div>
    );
  }
}

export default App;
