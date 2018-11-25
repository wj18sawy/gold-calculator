import React, { Component } from "react";
import NavBar from "./components/navbar";
import Inputs from "./components/inputs";
import Form from "./components/form";
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
        <Form />
      </React.Fragment>
    );
  }
}

export default App;
