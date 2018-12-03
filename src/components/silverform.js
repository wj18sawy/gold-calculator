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

export default class SilverForm extends Component {
  state = {
    weight: "",
    units: "g",
    purity: "92.5",
    silverPrice: "",
    total: 0,
    custom: false
  };

  change = e => {
    console.log("change", e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onReset = () => {
    this.setState({
      weight: "",
      units: "g",
      purity: this.state.custom ? "" : ".925",
      silverPrice: ""
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.calculate();
  };

  onCustom = () => {
    if (this.state.custom) {
      this.setState({
        purity: "92.5",
        custom: false
      });
    } else {
      this.setState({
        purity: "",
        custom: true
      });
    }
  };

  calculate = () => {
    const fields = this.state;
    let convRate = 0.999;

    if (fields.units === "g") {
      convRate = 0.035274;
    } else if (fields.units === "ozt") {
      convRate = 1.09714;
    } else if (fields.units === "dwt") {
      convRate = 0.0548571;
    }

    let silverPrice = fields.silverPrice;
    let weight = fields.weight * convRate;
    let content = fields.purity;
    console.log("Weight in oz:", weight);
    console.log("Silver content: ", content, "%");

    let total = (weight * (content / 100) * silverPrice).toFixed(2);
    console.log("Price of Silver: ", total);

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
    ValidatorForm.addValidationRule("isANumber", value => {
      if (isNaN(value)) {
        return false;
      }

      return true;
    });
    ValidatorForm.addValidationRule("isWrongPrice", value => {
      if (value > 100) {
        return false;
      }

      return true;
    });
    ValidatorForm.addValidationRule("isValidPercent", value => {
      if (value > 100 || (value < 1 && value !== 0)) {
        return false;
      }

      return true;
    });
  }

  render() {
    const isEnabled =
      !isNaN(this.state.weight) &&
      !isNaN(this.state.silverPrice) &&
      this.state.silverPrice > 0 &&
      this.state.weight > 0 &&
      this.state.silverPrice <= 100 &&
      this.state.purity >= 1 &&
      this.state.purity <= 100;

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
            <InputLabel shrink htmlFor="purity-label-placeholder">
              Purity
            </InputLabel>
            <Select
              value={this.state.purity}
              onChange={e => this.change(e)}
              input={<Input name="purity" id="purity-label-placeholder" />}
              name="purity"
              displayEmpty
              className="this.state.selectEmpty"
            >
              <MenuItem value="99.9">Pure/Fine Silver (99.9%)</MenuItem>
              <MenuItem value="95.8">British Silver (95.8%)</MenuItem>
              <MenuItem value="92.5">Sterling Silver (92.5%)</MenuItem>
              <MenuItem value="90">Coin Silver (90%)</MenuItem>
            </Select>
          </FormControl>
          <br style={{ display: this.state.custom ? "none" : "" }} />
          <TextValidator
            name="purity"
            label="Purity"
            value={this.state.purity}
            validators={["required", "isANumber", "isValidPercent"]}
            errorMessages={[
              "this field is required",
              "must be a number value",
              "this should be a percent value"
            ]}
            onChange={e => this.change(e)}
            style={{
              display: this.state.custom ? "" : "none"
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />

          <br />
          <br style={{ display: this.state.custom ? "" : "none" }} />

          <Button
            size="small"
            className={this.state.margin}
            onClick={() => this.onCustom()}
          >
            {this.state.custom ? "Select preset purity" : "Add custom purity"}
          </Button>
          <br />
          <br />
          <TextValidator
            name="silverPrice"
            label="Current Price of Silver"
            value={this.state.silverPrice}
            validators={["required", "isANumber", "isWrongPrice"]}
            errorMessages={[
              "this field is required",
              "must be a number value",
              "unlikely current price of silver per oz"
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
          src="https://www.goldbroker.com/widget/live-price/XAG?currency=USD"
          height={130}
          style={{ border: 0 }}
          title="silver widget"
        />

        <br />

        <div style={{ clear: "left" }}>
          <TextField
            id="filled-read-only-input"
            label="Total Silver Value:"
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
            label="Total Silver Value (92%):"
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
            label="Total Silver Value (62%):"
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
