import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Button } from "../../../components/elements";
import { TextInput } from "../../../components/compounds";
import { Item, Container } from "../../../layout";

const StyledLoginForm = styled.div`
  width: 100%;
  height: 100%;

  .item-button {
  }
`;

export class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <StyledLoginForm>
        <Item margin="stack-m">
          <TextInput
            value={username}
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
          />
        </Item>

        <Item margin="stack-base">
          <TextInput
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleInputChange}
          />
        </Item>

        <Item name="button">
          <Button full variant="primary">Log In</Button>
        </Item>
      </StyledLoginForm>
    );
  }
}

export default LoginForm;
