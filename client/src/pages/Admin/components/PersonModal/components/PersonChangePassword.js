import React, { Component, Fragment } from "react";
import format from "date-fns/format";

import { Button, Typography } from "src/components/elements";
import { TextInput, RadioInput, SelectInput } from "src/components/compounds";
import { Item, Box } from "src/layout";
import enums from "src/services/enums";

import roleInputOptions from "./roleInputOptions";

class PersonChangePassword extends Component {
  state = {
    person: {
      password: "",
      confirmPassword: ""
    }
  };

  handleInputChange = e => {
    this.setState({
      person: { ...this.state.person, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <Fragment>
        <Item margin="stack-l">
          <Typography variant="display-2">Change Password</Typography>
        </Item>

        {[
          {
            label: "Password",
            name: "password",
            type: "password",
            id: "password-input"
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
                name={item.name}
                id={item.id}
                type={item.type}
                value={this.state[item.name]}
                onChange={this.handleInputChange}
              />
            </Item>
          </Box>
        ))}

        <Item margin="stack-l">
          <Button variant="primary" onClick={this.handleSubmit}>
            Change Password
          </Button>
        </Item>
      </Fragment>
    );
  }
}

export default PersonChangePassword;
