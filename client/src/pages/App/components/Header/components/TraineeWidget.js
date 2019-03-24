import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import Clock from "./Clock";
import TimeElapsed from "./TimeElapsed";

import { clockTrainee } from "src/services/session/actions/userActionCreators";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

function returnEndTime(startTime, hours) {
  let endTime = startTime + hours;
  if (endTime > 24) {
    endTime -= 24;

    return `${endTime}:00 Next day`;
  }

  return `${endTime}:00`;
}

const StyledTraineeWidget = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export class TraineeWidget extends Component {
  render() {
    const {
      user: { data, isLoading },
      clockTrainee
    } = this.props;

    const dayToday = new Date().getDay();

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
            <Item margin="inline-base">
              {data.roleData.isClockedIn ? (
                <Button
                  variant="secondary"
                  full
                  onClick={clockTrainee}
                  disabled={isLoading}
                >
                  Clock Out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  full
                  onClick={clockTrainee}
                  disabled={isLoading}
                >
                  Clock In
                </Button>
              )}
            </Item>

            {data.roleData.isClockedIn && (
              <Item margin="inline-base" center>
                <TimeElapsed lastClockInTime={data.roleData.lastClockInTime} />
              </Item>
            )}

            <Item center>
              <Typography>
                Schedule Today:{" "}
                {data.roleData.schedule[daysOfTheWeek[dayToday]]
                  .isTrainingDay ? (
                  <Item inline>
                    <Typography variant="base">
                      {
                        data.roleData.schedule[daysOfTheWeek[dayToday]]
                          .startTime
                      }
                      :00 -{" "}
                      {returnEndTime(
                        data.roleData.schedule[daysOfTheWeek[dayToday]]
                          .startTime,
                        data.roleData.schedule[daysOfTheWeek[dayToday]].hours
                      )}{" "}
                      ({data.roleData.schedule[daysOfTheWeek[dayToday]].hours}{" "}
                      hour
                      {data.roleData.schedule[daysOfTheWeek[dayToday]].hours >
                        1 && "s"}
                      )
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
