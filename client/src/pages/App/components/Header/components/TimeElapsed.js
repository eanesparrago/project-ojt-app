// >>> https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component
import React, { Component } from "react";
import differenceInSeconds from "date-fns/difference_in_seconds";

import { Typography } from "src/components/elements";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";

class TimeElapsed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const { lastClockInTime } = this.props;

    this.setState({
      seconds: differenceInSeconds(Date.now(), lastClockInTime)
    });
  }

  render() {
    const { seconds } = this.state;

    return <Typography>Clocked In: {returnTimeElapsed(seconds)}</Typography>;
  }
}

export default TimeElapsed;
