import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import format from "date-fns/format";
import sortBy from "lodash/sortBy";

import { Item, Box } from "src/components/blocks";
import { DataGroup } from "src/components/compounds";
import { Typography, Button } from "src/components/elements";

import { cancelLeaveRequest } from "src/services/session/actions/userActionCreators";
import {
  approveLeaveRequest,
  rejectLeaveRequest
} from "src/services/session/actions/personActionCreators";
import enums from "src/services/enums";

const StyledLeaveRequests = styled.section`
  padding: var(--size-m);
  padding-bottom: 0;
  border: 2px solid ${p => p.theme.color.primary.accent};
  border-radius: var(--size-m);
`;

export class LeaveRequests extends Component {
  handleCancel = id => {
    const { cancelLeaveRequest } = this.props;

    cancelLeaveRequest(id);
  };

  handleApprove = id => {
    const {
      approveLeaveRequest,
      person: { data }
    } = this.props;

    approveLeaveRequest({
      userId: data._id,
      leaveRequestId: id
    });
  };

  handleReject = id => {
    const {
      rejectLeaveRequest,
      person: { data }
    } = this.props;

    if (window.confirm("Are you sure you want to reject this leave request?")) {
      rejectLeaveRequest({
        userId: data._id,
        leaveRequestId: id
      });
    }
  };

  render() {
    const { person, auth } = this.props;

    const {
      data: {
        roleData: { leaveRequests }
      }
    } = person;

    const leaveRequestsData = sortBy(leaveRequests, ["date"]).reverse();

    return (
      <StyledLeaveRequests>
        <Item margin="stack-base">
          <Typography variant="display-3">Pending Leave Requests:</Typography>
        </Item>

        {leaveRequestsData.map(leaveRequest => (
          <Item margin="stack-m" key={leaveRequest._id}>
            <DataGroup>
              <DataGroup.Label
                title={format(leaveRequest.date, "MMM D YYYY")}
              />
              <DataGroup.Content>
                <Typography variant="body">{leaveRequest.reason}</Typography>
              </DataGroup.Content>

              <DataGroup.Buttons>
                {auth.user.role === enums.roles.SUPERVISOR && (
                  <Fragment>
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.handleApprove(leaveRequest._id);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        this.handleReject(leaveRequest._id);
                      }}
                    >
                      Reject
                    </Button>
                  </Fragment>
                )}

                {auth.user.role === enums.roles.TRAINEE && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.handleCancel(leaveRequest._id);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </DataGroup.Buttons>
            </DataGroup>
          </Item>
        ))}
      </StyledLeaveRequests>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  { cancelLeaveRequest, approveLeaveRequest, rejectLeaveRequest }
)(LeaveRequests);
