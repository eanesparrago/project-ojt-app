import React, { Component } from "react";
import format from "date-fns/format";
import differenceInSeconds from "date-fns/difference_in_seconds";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";
import DailyTimeRecordItemEdit from "./DailyTimeRecordItemEdit";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";
import enums from "src/services/enums";

const StyledDailyTimeRecordItem = styled.div``;

export class DailyTimeRecordItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  handleToggleEditOpen = e => {
    e && e.preventDefault();
    const { handleEditToggle, clockData } = this.props;

    handleEditToggle(clockData._id);
  };

  render() {
    const {
      clockData,
      isClockCorrectionRequestActive,
      auth,
      editId,
      previousClock,
      person
    } = this.props;

    let title = "";
    if (previousClock) {
      if (
        format(previousClock.in, "MMM D YYYY") !==
        format(clockData.in, "MMM D YYYY")
      ) {
        title = format(clockData.in, "MMM D YYYY");
      }
    } else {
      title = format(clockData.in, "MMM D YYYY");
    }

    return (
      <StyledDailyTimeRecordItem>
        <Item margin="stack-s">
          <DataGroup>
            <DataGroup.Label title={title} />

            <DataGroup.Content>
              <Item margin="stack-s">
                <Typography variant="body">
                  {`${format(clockData.in, "HH:mm")} - ${
                    clockData.out
                      ? `${format(clockData.out, "HH:mm")} (${returnTimeElapsed(
                          differenceInSeconds(clockData.out, clockData.in)
                        )})`
                      : "Ongoing"
                  }`}
                </Typography>
              </Item>

              {clockData.isInvalid && (
                <Item>
                  <Typography variant="caption">Missed clock out!</Typography>
                </Item>
              )}

              {clockData.isOvertime && (
                <Item>
                  <Typography variant="caption">
                    Overtime{" "}
                    {clockData.overtimeReason &&
                      `- ${clockData.overtimeReason}`}
                  </Typography>
                </Item>
              )}
            </DataGroup.Content>

            {!isClockCorrectionRequestActive &&
              clockData.out &&
              auth.user.role !== enums.roles.EMPLOYEE && (
                <DataGroup.Buttons>
                  <Button
                    variant="secondary"
                    onClick={this.handleToggleEditOpen}
                  >
                    {auth.user.role === enums.roles.ADMINISTRATOR ||
                    auth.user.role === enums.roles.SUPERVISOR
                      ? "Edit"
                      : "Request Correction"}
                  </Button>
                </DataGroup.Buttons>
              )}
          </DataGroup>
        </Item>

        {editId === clockData._id && (
          <DailyTimeRecordItemEdit
            clockData={clockData}
            person={person}
            handleToggleEditOpen={this.handleToggleEditOpen}
          />
        )}
      </StyledDailyTimeRecordItem>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(DailyTimeRecordItem);
