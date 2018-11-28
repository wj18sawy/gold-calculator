import React, { Component } from "react";
import NavBar from "./components/navbar";
import Inputs from "./components/inputs";
import Form from "./components/form";
import TextField from "@material-ui/core/TextField";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      total: 0
    };
  }

  componentDidMount() {
    /* Fetch for API (not used because can't find free API that's in realtime)
    fetch(
      "https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?api_key=pzMmVf_AdsD4LZhNz7GN"
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
      */
  }

  onSubmit = fields => {
    this.setState({ fields });
    this.calculate(fields);
  };

  calculate = fields => {
    let convRate = 1;

    if (fields.units === "g") {
      convRate = 0.035274;
    } else if (fields.units === "ozt") {
      convRate = 1.09714;
    } else if (fields.units === "dwt") {
      convRate = 0.0548571;
    }

    let goldPrice = fields.goldPrice;
    let weight = fields.weight * convRate;
    let content = fields.karats / 24;
    console.log("Weight in oz:", weight);
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
    console.log(this.state.items);
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
        <div>
          <iframe
            src="https://www.goldbroker.com/widget/iframe/live/XAU/320?currency=USD"
            width="100%"
            height={320}
            style={{ border: 0, overflow: "hidden" }}
          />
          <br />
          Gold price by <a href="https://www.goldbroker.com">GoldBroker.com</a>
        </div>
      </div>
    );
  }
}

export default App;
