import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Button, Typography } from "src/components/elements";
import { TextInput } from "src/components/compounds";
import { Item, Box, Container } from "src/layout";

import { setFlashMessage } from "src/services/session/actions/appActionCreators";

class PersonChangePassword extends Component {
  state = {
    data: {
      password: "",
      confirmPassword: ""
    },
    isLoading: false,
    errors: {}
  };

  handleInputChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { ...state } = this.state;
    const { data, setFlashMessage } = this.props;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .put(`/api/users/${data._id}/change-password`, state.data)
        .then(res => {
          this.setState(
            {
              ...state,
              isLoading: false,
              errors: {},
              data: { password: "", confirmPassword: "" }
            },
            () => {
              setFlashMessage("Password was changed successfully.", "success");
            }
          );
        })
        .catch(err => {
          this.setState(
            {
              ...state,
              errors: err.response.data,
              isLoading: false
            },
            () => {
              setFlashMessage("An error occurred.", "error");
            }
          );
        });
    });
  };

  render() {
    const { ...state } = this.state;

    return (
      <Container as="form">
        <Item margin="stack-l">
          <Typography variant="display-2">Change Password</Typography>
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
          <Box margin="stack-base" key={item.id}>
            <Item NAME="personEdit-input-name" left margin="inline-base">
              <Typography variant="base" as="label" htmlFor={item.id}>
                {item.label}
              </Typography>
            </Item>

            <Item NAME="personEdit-input">
              <TextInput
                autoFocus={item.autoFocus}
                name={item.name}
                id={item.id}
                type={item.type}
                value={state.data[item.name]}
                onChange={this.handleInputChange}
                disabled={state.isLoading}
                error={state.errors[item.name]}
              />
            </Item>
          </Box>
        ))}

        <Item margin="stack-l">
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit}
            disabled={state.isLoading}
          >
            Change Password
          </Button>
        </Item>
      </Container>
    );
  }
}

export default connect(
  null,
  {
    setFlashMessage: setFlashMessage
  }
)(PersonChangePassword);
