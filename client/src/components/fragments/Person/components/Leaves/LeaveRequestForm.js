import React, { Component } from "react";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { FormGroup, TextInput } from "src/components/compounds";

import { requestLeave } from "src/services/session/actions/userActionCreators";

export class LeaveRequestForm extends Component {
  state = {
    date: undefined,
    reason: ""
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { requestLeave, handleFormToggle } = this.props;
    const { ...state } = this.state;

    requestLeave(state).then(() => {
      handleFormToggle();
    });
  };

  render() {
    const {
      handleFormToggle,
      user: { data, isLoading, errors }
    } = this.props;

    return (
      <form>
        <Item margin="stack-base">
          <Typography variant="display-3">Request Leave</Typography>
        </Item>

        <Item margin="stack-base">
          <FormGroup>
            <FormGroup.Label title="Date" htmlFor="date-input" />
            <FormGroup.Input>
              <TextInput
                id="date-input"
                type="date"
                name="date"
                onChange={this.handleInputChange}
                error={errors.date}
                disabled={isLoading}
              />
            </FormGroup.Input>
          </FormGroup>
        </Item>

        <Item margin="stack-base">
          <FormGroup>
            <FormGroup.Label title="Reason" htmlFor="reason-input" />

            <FormGroup.Input>
              <TextInput
                id="reason-input"
                type="text"
                name="reason"
                onChange={this.handleInputChange}
                error={errors.reason}
                disabled={isLoading}
              />
            </FormGroup.Input>
          </FormGroup>
        </Item>

        <Item>
          <FormGroup>
            <FormGroup.Label />

            <FormGroup.Input>
              <Box>
                <Item margin="inline-s">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Item>

                <Item>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleFormToggle}
                    isLoading={isLoading}
                  >
                    Cancel
                  </Button>
                </Item>
              </Box>
            </FormGroup.Input>
          </FormGroup>
        </Item>
      </form>
    );
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  {
    requestLeave
  }
)(LeaveRequestForm);
