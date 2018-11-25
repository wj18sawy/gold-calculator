import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onReset, counters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map(counter => (
          <Counter
            key={counter.id} //key attribute used internally by react
            onDelete={onDelete}
            onIncrement={onIncrement}
            counter={counter} //counter object carries all needed data
          />
        ))}
      </div>
    );
  }
}

export default Counters;
