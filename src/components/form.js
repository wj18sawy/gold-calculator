import React, { Component } from "react";

export default class Form extends Component {
  state = {
    weight: "",
    units: "g",
    karats: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form>
        <input
          name="weight"
          placeholder="Weight"
          value={this.state.weight}
          onChange={e => this.change(e)}
        />
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
        <input
          name="karats"
          placeholder="Karats"
          value={this.state.karats}
          onChange={e => this.change(e)}
        />
      </form>
    );
  }
}