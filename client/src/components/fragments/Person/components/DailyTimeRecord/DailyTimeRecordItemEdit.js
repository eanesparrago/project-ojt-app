import React, { Component } from "react";
import styled from "styled-components";
import format from "date-fns/format";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { FormGroup, TextInput } from "src/components/compounds";

import { editClock } from "src/services/session/actions/personActionCreators";

const StyledDailyTimeRecordItemEdit = styled.form``;

export class DailyTimeRecordItemEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      in: format(props.clockData.in, "YYYY-MM-DDTHH:mm"),
      out: format(props.clockData.out, "YYYY-MM-DDTHH:mm")
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      clock: {
        in: this.state.in,
        out: this.state.out
      },
      clockId: this.props.clockData._id,
      userId: this.props.clockData.user
    };

    this.props.editClock(data);
  };

  render() {
    const { ...state } = this.state;
    const {
      handleToggleEditOpen,
      person: { errors, isLoading }
    } = this.props;

    return (
      <StyledDailyTimeRecordItemEdit>
        <Item>
          <Typography />
        </Item>

        <Item margin="stack-base">
          <FormGroup>
            <FormGroup.Label title="Clock In" htmlFor="clock-in-input" />

            <FormGroup.Input>
              <TextInput
                type="datetime-local"
                name="in"
                id="clock-in-input"
                autoFocus
                value={state.in}
                error={errors.in}
                onChange={this.handleInputChange}
                disabled={isLoading}
              />
            </FormGroup.Input>
          </FormGroup>
        </Item>

        <Item margin="stack-base">
          <FormGroup>
            <FormGroup.Label title="Clock Out" htmlFor="clock-out-input" />

            <FormGroup.Input>
              <TextInput
                type="datetime-local"
                name="out"
                id="clock-out-input"
                autoFocus
                value={state.out}
                error={errors.out}
                onChange={this.handleInputChange}
                disabled={isLoading}
              />
            </FormGroup.Input>
          </FormGroup>
        </Item>

        <Item margin="stack-base">
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
                  <Button variant="secondary" onClick={handleToggleEditOpen}>
                    Cancel
                  </Button>
                </Item>
              </Box>
            </FormGroup.Input>
          </FormGroup>
        </Item>
      </StyledDailyTimeRecordItemEdit>
    );
  }
}

export default connect(
  state => ({
    person: state.person
  }),
  {
    editClock: editClock
  }
)(DailyTimeRecordItemEdit);
