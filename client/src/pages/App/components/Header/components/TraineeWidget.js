import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { FormGroup, TextInput } from "src/components/compounds";
import Clock from "./Clock";
import TimeElapsed from "./TimeElapsed";

import { clockTrainee } from "src/services/session/actions/userActionCreators";
import returnScheduleToday from "src/services/utils/returnScheduleToday";
import returnLastClockInTime from "src/services/utils/returnLastClockInTime";
import checkIfOvertime from "src/services/utils/checkIfOvertime";
import checkIfLeave from "src/services/utils/checkIfLeave";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const StyledTraineeWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export class TraineeWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overtimeReason: ""
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClockClick = e => {
    e.preventDefault();
    const { clockTrainee } = this.props;

    const data = {
      overtimeReason: this.state.overtimeReason
    };

    clockTrainee(data);
  };

  handleOvertimeReasonChange = e => {
    this.setState({ overtimeReason: e.target.value });
  };

  render() {
    const {
      user: { data, isLoading }
    } = this.props;

    const dayToday = new Date().getDay();

    let isLeaveToday;
    if (data) {
      isLeaveToday = checkIfLeave(data.roleData.leaves);
    }

    return (
      <StyledTraineeWidget>
        <Item center margin="inline-base">
          <Clock />
        </Item>

        {!data && isLoading ? (
          <Typography variant="caption">Loading</Typography>
        ) : !data ? (
          <Typography variant="caption">Error</Typography>
        ) : (
          <Box>
            {/* >>> Clock button */}

            <Item margin="inline-base">
              {data.roleData.isClockedIn ? (
                <Button
                  variant="secondary"
                  full
                  onClick={this.handleClockClick}
                  disabled={isLoading}
                >
                  Clock Out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  full
                  onClick={this.handleClockClick}
                  disabled={isLoading || isLeaveToday}
                >
                  {isLeaveToday ? "On Leave" : "Clock In"}
                </Button>
              )}
            </Item>

            {/* >>> Overtime reason */}
            {data.roleData.isClockedIn &&
              checkIfOvertime(data.roleData.schedule) && (
                <Item margin="inline-m">
                  <FormGroup>
                    <FormGroup.Input>
                      <TextInput
                        placeholder="Overtime reason"
                        name="overtimeReason"
                        type="text"
                        onChange={this.handleOvertimeReasonChange}
                        disabled={isLoading}
                        id="overtime-reason-input"
                        maxLength="60"
                      />
                    </FormGroup.Input>
                  </FormGroup>
                </Item>
              )}

            {/* >>> Time elapsed */}
            {data.roleData.isClockedIn && (
              <Item margin="inline-base" center>
                <TimeElapsed
                  lastClockInTime={returnLastClockInTime(data.roleData.clocks)}
                />
              </Item>
            )}

            {/* >>> Schedule today */}
            <Item center>
              <Typography>
                Schedule Today:{" "}
                {data.roleData.schedule[daysOfTheWeek[dayToday]]
                  .isTrainingDay ? (
                  <Item inline>
                    <Typography variant="base">
                      {returnScheduleToday(data.roleData.schedule)}
                    </Typography>
                  </Item>
                ) : (
                  "Off"
                )}
              </Typography>
            </Item>
          </Box>
        )}
      </StyledTraineeWidget>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { clockTrainee: clockTrainee }
)(TraineeWidget);
