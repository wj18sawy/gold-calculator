import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

/**
 *  GoldForm component is a form for the gold calculator
 */
export default class GoldForm extends Component {
  /* State holds all of the values needed in the calculation, that are filled out using the form */
  state = {
    weight: "",
    units: "g",
    karats: "",
    goldPrice: "",
    total: 0,
    custom: false
  };

  /* state is changed actively as user fills out the form */
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /* state can be reset with a button under the form */
  onReset = () => {
    this.setState({
      weight: "",
      units: "g",
      karats: "",
      goldPrice: ""
    });
  };

  /* for setting custom manual amount of karats */
  onCustom = () => {
    if (this.state.custom) {
      this.setState({
        karats: "",
        custom: false
      });
    } else {
      this.setState({
        karats: "",
        custom: true
      });
    }
  };

  /* onSubmit functions does calculations and sets the state */
  onSubmit = e => {
    e.preventDefault(); /* stops browser from refreshing */

    const fields = this.state;
    let convRate = 1;

    /* unit conversion to ounces */
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

    /* calculation for total price, more info is on the calculations.js page */
    let total = (weight * content * goldPrice).toFixed(2);
    console.log("Price of Gold: ", total);

    this.setState({ total });
  };

  /* Formatter function just converts the number into a price format by adding commas and a decimal where necessary ex: 1,000.00) */
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
    ValidatorForm.addValidationRule("isValidHighKarat", value => {
      if (value > 24) {
        return false;
      }

      return true;
    });
    ValidatorForm.addValidationRule("isValidLowKarat", value => {
      if (value <= 0 && value !== "") {
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
            errorMessages={[
              "this field is required",
              "this should be a number value"
            ]}
            onChange={e => this.change(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {this.state.units}
                </InputAdornment>
              )
            }}
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
          <br />
          <FormControl
            className={this.state.formControl}
            style={{ display: this.state.custom ? "none" : "" }}
          >
            <InputLabel shrink htmlFor="karats-label-placeholder">
              Karats
            </InputLabel>
            <Select
              value={this.state.karats}
              onChange={e => this.change(e)}
              input={<Input name="karats" id="karats-label-placeholder" />}
              name="karats"
              displayEmpty
              className="this.state.selectEmpty"
            >
              <MenuItem value="10">10K (41.7%)</MenuItem>
              <MenuItem value="12">12K (50%)</MenuItem>
              <MenuItem value="14">14K (58.3%)</MenuItem>
              <MenuItem value="18">18K (75%)</MenuItem>
              <MenuItem value="22">22K (91.7%)</MenuItem>
              <MenuItem value="24">24K (99.9%)</MenuItem>
            </Select>
          </FormControl>
          <br style={{ display: this.state.custom ? "none" : "" }} />
          <TextValidator
            name="karats"
            label="Karats"
            value={this.state.karats}
            validators={[
              "required",
              "isANumber",
              "isValidHighKarat",
              "isValidLowKarat"
            ]}
            errorMessages={[
              "this field is required",
              "must be a number value",
              "must be less than or equal to 24 karats",
              "must be greater than 0 karats"
            ]}
            onChange={e => this.change(e)}
            style={{
              display: this.state.custom ? "" : "none"
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">K</InputAdornment>
            }}
          />

          <br />
          <br style={{ display: this.state.custom ? "" : "none" }} />

          <Button
            size="small"
            className={this.state.margin}
            onClick={() => this.onCustom()}
          >
            {this.state.custom
              ? "Select preset karat amount"
              : "Add custom karat amount"}
          </Button>
          <br />
          <br />

          <TextValidator
            name="goldPrice"
            label="Current Price of Gold / oz"
            value={this.state.goldPrice}
            validators={["required", "isANumber", "isWrongPrice"]}
            errorMessages={[
              "this field is required",
              "must be a number value",
              "unlikely spot price of gold per oz"
            ]}
            onChange={e => this.change(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            color="primary"
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
          title="gold widget"
          width={130}
        />
        <br />

        <div style={{ clear: "left" }}>
          <TextField
            id="filled-read-only-input"
            label="Total Gold Value:"
            value={"$" + this.formatter((this.state.total * 1).toFixed(2))}
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
