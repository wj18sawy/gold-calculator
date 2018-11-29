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

export default class GoldForm extends Component {
  state = {
    weight: "",
    units: "g",
    karats: "",
    goldPrice: "",
    total: 0
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onReset = () => {
    this.setState({
      weight: "",
      units: "g",
      karats: "",
      goldPrice: ""
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.calculate();
  };

  calculate = () => {
    const fields = this.state;
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

    this.setState({ total });
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

    total = number + "" + decimal;

    return total;
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
    ValidatorForm.addValidationRule("isWrongPrice", value => {
      if ((value < 500 && value > 0) || value > 5000) {
        return false;
      }

      return true;
    });
  }

  render() {
    const isEnabled =
      !isNaN(this.state.weight) &&
      !isNaN(this.state.goldPrice) &&
      !isNaN(this.state.karats) &&
      this.state.karats > 0 &&
      this.state.goldPrice > 0 &&
      this.state.weight > 0 &&
      this.state.karats <= 24 &&
      this.state.goldPrice >= 500 &&
      this.state.goldPrice <= 5000;
    return (
      <div>
        <ValidatorForm
          autoComplete="off"
          onSubmit={e => this.onSubmit(e)}
          style={{ float: "left" }}
        >
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
          <br />
          <TextValidator
            name="goldPrice"
            label="Current Price of Gold"
            value={this.state.goldPrice}
            validators={["required", "isANumber", "isWrongPrice"]}
            errorMessages={[
              "this field is required",
              "must be a number value",
              "unlikely current price of gold per oz"
            ]}
            onChange={e => this.change(e)}
          />
          <Button
            type="submit"
            color="primagitry"
            onClick={e => this.onSubmit(e)}
            disabled={!isEnabled}
          >
            =
          </Button>
          <br />
          <Button color="secondary" onClick={() => this.onReset()}>
            Reset
          </Button>
        </ValidatorForm>

        <iframe
          src="https://www.goldbroker.com/widget/live-price/XAU?currency=USD"
          height={130}
          style={{ border: 0 }}
        />
        <br />

        <div style={{ clear: "left" }}>
          <TextField
            id="filled-read-only-input"
            label="Total Gold Value:"
            value={"$" + (this.state.total * 1).toFixed(2)}
            className={this.state.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="filled"
          />

          <TextField
            id="filled-read-only-input"
            label="Total Gold Value (92%):"
            value={"$" + this.formatter((this.state.total * 0.92).toFixed(2))}
            className={this.state.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="filled"
          />

          <TextField
            id="filled-read-only-input"
            label="Total Gold Value (62%):"
            value={"$" + this.formatter((this.state.total * 0.62).toFixed(2))}
            className={this.state.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="filled"
          />
        </div>
      </div>
    );
  }
}
