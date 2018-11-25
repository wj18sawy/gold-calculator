import React, { Component } from "react";

class Inputs extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="form-inline" action="/action_page.php">
          <div className="form-group">
            <label htmlFor="input1">Weight</label>
            <input
              type="number"
              className="form-inline"
              id="input1"
              placeholder="00.00"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Units</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input2">Karats</label>
            <input
              type="number"
              className="form-inline"
              id="input2"
              placeholder="00.00"
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => this.props.onSubmit()}
          >
            =
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Inputs;
