import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Item,  Container } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { TextInput, FormGroup } from "src/components/compounds";

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
    const { data, setFlashMessage, closeForms } = this.props;

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
              closeForms();
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
    const { data, isLoading, errors } = this.state;

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
                  value={data[item.name]}
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
  null,
  {
    setFlashMessage: setFlashMessage
  }
)(PersonChangePassword);
