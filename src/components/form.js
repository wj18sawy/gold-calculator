import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Form extends Component {
  state = {
    weight: "",
    units: "g",
    karats: ""
  };

  change = e => {
    console.log("Text");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  onReset = () => {};

  render() {
    return (
      <form>
        <TextField
          id="standard-helperText"
          name="weight"
          label="Weight"
          value={this.state.weight}
          onChange={e => this.change(e)}
        />
        <br />
        <select
          name="units"
          value={this.state.units}
          onChange={e => this.change(e)}
        >
          <option value="g">Grams (g)</option>
          <option value="oz">Ounces (oz)</option>
          <option value="ozt">Troy ounces (oz t)</option>
          <option value="dwt">Pennyweight (dwt)</option>
        </select>
        <br />
        <TextField
          id="standard-helperText"
          name="karats"
          label="Karats"
          value={this.state.karats}
          onChange={e => this.change(e)}
        />
        <Button color="primary" onClick={e => this.onSubmit(e)}>
          =
        </Button>
        <br />
        <Button color="secondary" onClick={() => this.onReset}>
          Reset
        </Button>
      </form>
    );
  }
}
