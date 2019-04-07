import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Item, Container } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { TextInput, FormGroup } from "src/components/compounds";

import { changePassword } from "src/services/session/actions/personActionCreators";

class PersonChangePassword extends Component {
  state = {
    password: "",
    confirmPassword: ""
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      person: { data },
      changePassword,
      closeForms
    } = this.props;
    const { ...state } = this.state;

    changePassword(data._id, state).then(() => {
      closeForms();
    });
  };

  render() {
    const {
      person: { isLoading },
      errors
    } = this.props;
    const { ...state } = this.state;

    return (
      <Container as="form">
        <Item margin="stack-l">
          <Typography variant="display-3">Change Password</Typography>
        </Item>

        {[
          {
            label: "Password",
            name: "password",
            type: "password",
            id: "password-input",
            autoFocus: true
          },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            id: "confirm-password-input"
          }
        ].map(item => (
          <Item margin="stack-base" key={item.id}>
            <FormGroup>
              <FormGroup.Label title={item.label} htmlFor={item.id} />

              <FormGroup.Input>
                <TextInput
                  autoFocus={item.autoFocus}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  value={state[item.name]}
                  onChange={this.handleInputChange}
                  error={errors[item.name]}
                  disabled={isLoading}
                  {...item}
                />
              </FormGroup.Input>
            </FormGroup>
          </Item>
        ))}

        <Item margin="stack-l">
          <FormGroup.Label />
          <FormGroup>
            <FormGroup.Input>
              <Item>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </Item>
            </FormGroup.Input>
          </FormGroup>
        </Item>
      </Container>
    );
  }
}

export default connect(
  state => ({
    errors: state.errors
  }),
  {
    changePassword: changePassword
  }
)(PersonChangePassword);
