// https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component

import React, { Component } from "react";
import format from "date-fns/format";

import { Typography } from "src/components/elements";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render() {
    const { time } = this.state;

    return <Typography>{format(time, " MMM D ddd YYYY , HH:mm")}</Typography>;
  }
}

export default Clock;
