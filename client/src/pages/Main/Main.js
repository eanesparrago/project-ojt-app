import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "../../components/elements";

export class Main extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="text">Text Button</Button>
      </div>
    );
  }
}

export default Main;
