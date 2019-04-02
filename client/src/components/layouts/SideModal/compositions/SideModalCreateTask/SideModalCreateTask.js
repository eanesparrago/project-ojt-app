import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import { FormGroup, TextInput, TextAreaInput } from "src/components/compounds";
import { SideModal } from "src/components/layouts";

import {
  createTask,
  clearErrors
} from "src/services/session/actions/taskActionCreators";

export class SideModalCreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      ticketNumber: ""
    };
  }

  componentDidMount() {
    const { clearErrors } = this.props;

    clearErrors();
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    const { createTask, history } = this.props;
    const { ...state } = this.state;

    const data = {
      content: state.content,
      ticketNumber: state.ticketNumber
    };

    createTask(data).then(() => {
      history.goBack();
    });
  };

  render() {
    const {
      task: { errors, isLoading }
    } = this.props;
    const { ...state } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Create Task" />

        <SideModal.Body as="form">
          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label title="Content" htmlFor="content-input" />
              <FormGroup.Input>
                <TextAreaInput
                  autoFocus
                  id="content-input"
                  value={state.content}
                  name="content"
                  cols="30"
                  rows="10"
                  error={errors.content}
                  disabled={isLoading}
                  onChange={this.handleInputChange}
                  
                />
              </FormGroup.Input>
            </FormGroup>
          </Item>

          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label
                title="Ticket Number (Optional)"
                htmlFor="ticket-number-input"
              />

              <FormGroup.Input>
                <TextInput
                  name="ticketNumber"
                  id="ticket-number-input"
                  type="number"
                  value={state.ticketNumber}
                  onChange={this.handleInputChange}
                  error={errors.ticketNumber}
                  disabled={isLoading}
                  maxLength="30"
                />
              </FormGroup.Input>
            </FormGroup>
          </Item>

          <Item>
            <FormGroup>
              <FormGroup.Label />
              <FormGroup.Input>
                <Button
                  type="submit"
                  variant="primary"
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </FormGroup.Input>
            </FormGroup>
          </Item>
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      task: state.task
    }),
    { createTask: createTask, clearErrors: clearErrors }
  )(SideModalCreateTask)
);
