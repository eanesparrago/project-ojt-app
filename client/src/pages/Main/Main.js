import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as postsActions from "./data/posts/postsActions";

export class Main extends Component {
  static propTypes = {};

  handleClick = () => {
    this.props.dispatch(postsActions.add("post test"));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default connect()(Main);
