import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import RoutedApp from "./RoutedApp";

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <RoutedApp />
      </BrowserRouter>
    );
  }
}

export default App;
