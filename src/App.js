import React, { Component } from "react";
import NavBar from "./components/navbar";
import Inputs from "./components/inputs";
import "./App.css";

class App extends Component {
  state = {};

  handleSubmit = counterId => {
    console.log("Form submitted");
    //const counters = this.state.counters.filter(c => c.id != counterId);
    //this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Inputs onSubmit={this.handleSubmit} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
