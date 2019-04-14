import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { DataGroup } from "src/components/compounds";
import { Typography, Button } from "src/components/elements";

import {
  approveScheduleUpdateRequest,
  rejectScheduleUpdateRequest
} from "src/services/session/actions/personActionCreators";
import { cancelScheduleUpdateRequest } from "src/services/session/actions/userActionCreators";
import enums from "src/services/enums";

function returnEndTime(startTime, hours) {
  let endTime = startTime + hours;
  if (endTime > 24) {
    endTime -= 24;

    return `${endTime}:00 Next day`;
  }

  return `${endTime}:00`;
}

const StyledUpdateRequest = styled.div`
  padding: var(--size-m);
  border: 2px solid ${p => p.theme.color.primary.accent};
  border-radius: var(--size-m);
`;

export class UpdateRequest extends Component {
  handleCancel = e => {
    e.preventDefault();
    const { cancelScheduleUpdateRequest } = this.props;

    cancelScheduleUpdateRequest();
  };

  handleApprove = e => {
    e.preventDefault();
    const {
      approveScheduleUpdateRequest,
      person: { data }
    } = this.props;

    approveScheduleUpdateRequest(data._id);
  };

  handleReject = e => {
    e.preventDefault();
    const {
      rejectScheduleUpdateRequest,
      person: { data }
    } = this.props;

    rejectScheduleUpdateRequest(data._id);
  };

  render() {
    const { person, auth } = this.props;

    return (
      <StyledUpdateRequest>
        <Item margin="stack-base">
          <Typography variant="display-3">
            Pending Schedule Update Request:
          </Typography>
        </Item>

        {Object.entries(
          person.data.roleData.scheduleUpdateRequest.schedule
        ).map(([key, value]) => (
          <Item margin="stack-base" key={key}>
            <DataGroup>
              <DataGroup.Label title={key} />

              <DataGroup.Content>
                {value.isTrainingDay ? (
                  <Box>
                    <Typography variant="body">
                      {value.startTime}:00 -{" "}
                      {returnEndTime(value.startTime, value.hours)} (
                      {value.hours} hour{value.hours > 1 && "s"})
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="caption">Off</Typography>
                )}
              </DataGroup.Content>
            </DataGroup>
          </Item>
        ))}

        <Box row>
          {auth.user.role === enums.roles.TRAINEE && (
            <Item>
              <Button variant="secondary" onClick={this.handleCancel}>
                Cancel
              </Button>
            </Item>
          )}

          {auth.user.role === enums.roles.SUPERVISOR && (
            <Fragment>
              <Item margin="inline-s">
                <Button variant="primary" onClick={this.handleApprove}>
                  Approve
                </Button>
              </Item>

              <Item>
                <Button variant="secondary" onClick={this.handleReject}>
                  Reject
                </Button>
              </Item>
            </Fragment>
          )}
        </Box>
      </StyledUpdateRequest>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    cancelScheduleUpdateRequest,
    approveScheduleUpdateRequest,
    rejectScheduleUpdateRequest
  }
)(UpdateRequest);
