// >>> https://openclassrooms.com/en/courses/4286486-build-web-apps-with-reactjs/4286711-build-a-ticking-clock-component
import React, { Component } from "react";
import differenceInSeconds from "date-fns/difference_in_seconds";

import { Typography } from "src/components/elements";

// >>> https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
function convertSecondsToElapsedTime(seconds) {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + "h " + minutes + "m " + seconds + "s";
}

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

    return <Typography>Time Elapsed: {convertSecondsToElapsedTime(seconds)}</Typography>;
  }
}

export default TimeElapsed;
