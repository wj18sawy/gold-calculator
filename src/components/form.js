import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

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
      <form autoComplete="off">
        <TextField
          id="standard-helperText"
          name="weight"
          label="Weight"
          value={this.state.weight}
          onChange={e => this.change(e)}
        />
        <br />
        <br />
        <FormControl name="units" className={this.state.formControl}>
          <InputLabel htmlFor="units-helper">Units</InputLabel>
          <Select
            value={this.state.units}
            onChange={e => this.change(e)}
            input={<Input name="units" id="units-helper" />}
          >
            <MenuItem value="g">Grams (g)</MenuItem>
            <MenuItem value="oz">Ounces (oz)</MenuItem>
            <MenuItem value="ozt">Troy ounces (oz t)</MenuItem>
            <MenuItem value="dwt">Pennyweight (dwt)</MenuItem>
          </Select>
        </FormControl>
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
