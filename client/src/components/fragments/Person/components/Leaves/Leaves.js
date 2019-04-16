import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import sortBy from "lodash/sortBy";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";
import LeaveRequests from "./LeaveRequests";
import LeaveRequestForm from "./LeaveRequestForm";

import { cancelLeave } from "src/services/session/actions/userActionCreators";
import enums from "src/services/enums";

export class Leaves extends Component {
  state = {
    isFormOpen: false
  };

  handleFormToggle = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };

  handleCancel = id => {
    const { cancelLeave } = this.props;

    if (window.confirm("Are you sure you want to cancel this leave?")) {
      cancelLeave(id);
    }
  };

  render() {
    const { person, auth } = this.props;
    const {
      data: {
        roleData: { leaves, leaveRequests }
      }
    } = person;
    const { ...state } = this.state;

    const leavesData = sortBy(leaves, ["date"]).reverse();

    return (
      <Fragment>
        <Box margin="stack-l">
          <Item center margin="inline-base">
            <Typography variant="display-2">Leaves</Typography>
          </Item>

          {auth.user.role === enums.roles.TRAINEE && (
            <Item>
              {!state.isFormOpen ? (
                <Button variant="secondary" onClick={this.handleFormToggle}>
                  Request Leave
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  icon
                  onClick={this.handleFormToggle}
                >
                  <i className="fas fa-arrow-left" />
                  <span id="hidden">Back</span>
                </Button>
              )}
            </Item>
          )}
        </Box>

        {state.isFormOpen && (
          <Item margin="stack-l">
            <LeaveRequestForm handleFormToggle={this.handleFormToggle} />
          </Item>
        )}

        {!state.isFormOpen && (
          <Fragment>
            {leaveRequests.length > 0 && (
              <Item margin="stack-l">
                <LeaveRequests person={person} />
              </Item>
            )}

            {leavesData.map(leave => (
              <Item margin="stack-base" key={leave._id}>
                <DataGroup>
                  <DataGroup.Label title={format(leave.date, "MMM D YYYY")} />

                  <DataGroup.Content>
                    <Typography variant="body">{leave.reason}</Typography>
                  </DataGroup.Content>

                  {auth.user.role === enums.roles.TRAINEE && (
                    <DataGroup.Buttons>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          this.handleCancel(leave._id);
                        }}
                      >
                        Cancel
                      </Button>
                    </DataGroup.Buttons>
                  )}
                </DataGroup>
              </Item>
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  {
    cancelLeave
  }
)(Leaves);
