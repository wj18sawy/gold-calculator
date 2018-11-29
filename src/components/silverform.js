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

export default class SilverForm extends Component {
  state = {
    weight: "",
    units: "g",
    purity: "",
    silverPrice: "",
    total: 0,
    custom: false
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
      purity: "",
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
        custom: false
      });
    } else {
      this.setState({
        custom: true
      });
    }
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

    let silverPrice = fields.silverPrice;
    let weight = fields.weight * convRate;
    let content = fields.karats / 24;
    console.log("Weight in oz:", weight);
    console.log("Silver content: ", content * 100, "%");

    let total = (weight * content * silverPrice).toFixed(2);
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
  }

  render() {
    const isEnabled =
      !isNaN(this.state.weight) &&
      !isNaN(this.state.silverPrice) &&
      this.state.silverPrice > 0 &&
      this.state.weight > 0 &&
      this.state.silverPrice <= 100;

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
          <br />
          <FormControl className={this.state.formControl}>
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
              style={{ display: this.state.custom ? "none" : "" }}
            >
              <MenuItem value=".999">Pure/Fine Silver (%99.9)</MenuItem>
              <MenuItem value=".958">British Silver (%95.8)</MenuItem>
              <MenuItem value=".925">Sterling Silver (%92.5)</MenuItem>
              <MenuItem value=".9">Coin Silver (%90)</MenuItem>
            </Select>
          </FormControl>
          <br />

          <Input
            placeholder="ex: 93.8"
            className={this.state.input}
            inputProps={{
              "aria-label": "Description"
            }}
            style={{
              display: this.state.custom ? "" : "none"
            }}
          />
          <br />
          <Button
            size="small"
            className={this.state.margin}
            onClick={() => this.onCustom()}
          >
            {this.state.custom ? "Select preset purity" : "Add custom purity"}
          </Button>

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
          src="https://www.goldbroker.com/widget/live-price/XAG?currency=USD"
          height={130}
          style={{ border: 0 }}
        />

        <br />

        <div style={{ clear: "left" }}>
          <TextField
            id="filled-read-only-input"
            label="Total Silver Value:"
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
