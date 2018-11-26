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
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  onReset = () => {
    this.setState({
      weight: "",
      weightError: "",
      units: "g",
      karats: "",
      karatsError: ""
    });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isValidKarat", value => {
      if (value < 0 || value > 24) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isANumber", value => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    });
  }

  render() {
    return (
      <ValidatorForm autoComplete="off" onSubmit={e => this.onSubmit(e)}>
        <TextValidator
          name="weight"
          label="Weight"
          value={this.state.weight}
          validators={["required", "isANumber"]}
          errorMessages={["this field is required", "must be a number value"]}
          onChange={e => this.change(e)}
        />
        <br />
        <br />
        <FormControl className={this.state.formControl}>
          <InputLabel shrink htmlFor="units-label-placeholder">
            Units
          </InputLabel>
          <Select
            value={this.state.units}
            onChange={e => this.change(e)}
            input={<Input name="units" id="units-label-placeholder" />}
            name="units"
            displayEmpty
            className="this.state.selectEmpty"
          >
            <MenuItem value="g">Grams (g)</MenuItem>
            <MenuItem value="oz">Ounces (oz)</MenuItem>
            <MenuItem value="ozt">Troy ounces (oz t)</MenuItem>
            <MenuItem value="dwt">Pennyweight (dwt)</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextValidator
          name="karats"
          label="Karats"
          value={this.state.karats}
          validators={["required", "isANumber", "isValidKarat"]}
          errorMessages={[
            "this field is required",
            "must be a number value",
            "must be between 0-24 karats"
          ]}
          onChange={e => this.change(e)}
        />
        <Button type="submit" color="primary" onClick={e => this.onSubmit(e)}>
          =
        </Button>
        <br />
        <Button color="secondary" onClick={() => this.onReset()}>
          Reset
        </Button>
      </ValidatorForm>
    );
  }
}
