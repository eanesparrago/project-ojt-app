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
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  render() {
    const { clockData, isClockCorrectionRequestActive, auth } = this.props;
    const { isEditOpen } = this.state;

    return (
      <StyledDailyTimeRecordItem>
        <Item margin="stack-s">
          <DataGroup>
            <DataGroup.Label title={format(clockData.in, "MMM D YYYY")} />

            <DataGroup.Content>
              <Typography variant="body">
                {`${format(clockData.in, "HH:mm")} - ${
                  clockData.out
                    ? `${format(clockData.out, "HH:mm")} (${returnTimeElapsed(
                        differenceInSeconds(clockData.out, clockData.in)
                      )})`
                    : "Ongoing"
                }`}
              </Typography>
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

                  <Button variant="secondary">
                    {auth.user.role === enums.roles.ADMINISTRATOR ||
                    auth.user.role === enums.roles.SUPERVISOR
                      ? "Delete"
                      : "Request Delete"}
                  </Button>
                </DataGroup.Buttons>
              )}
          </DataGroup>
        </Item>

        {isEditOpen && (
          <DailyTimeRecordItemEdit
            clockData={clockData}
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
