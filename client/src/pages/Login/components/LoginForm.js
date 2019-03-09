import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Button, Typography } from "../../../components/elements";
import { TextInputSpecial } from "../../../components/compounds";
import { Item, Container } from "src/components/blocks";
import { loginUser } from "src/services/session/actions/authActionCreators";
import { connect } from "react-redux";

const StyledLoginForm = styled.form`
  width: 100%;
  height: 100%;

  .item-button {
  }

  .item-error {
    color: ${p => p.theme.color.error};
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    const { username, password } = this.state;
    const { auth } = this.props;

    return (
      <StyledLoginForm>
        <Item margin="stack-m">
          <TextInputSpecial
            value={username}
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
            autoComplete="off"
            required
            disabled={auth.isLoading}
          />
        </Item>

        <Item margin="stack-base">
          <TextInputSpecial
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleInputChange}
            autoComplete="off"
            required
            disabled={auth.isLoading}
          />
        </Item>

        {auth.error && (
          <Item NAME="error" margin="stack-base">
            <Typography variant="base">{auth.error}</Typography>
          </Item>
        )}

        <Item NAME="button">
          <Button
            type="submit"
            full
            variant="primary"
            onClick={this.handleSubmit}
            disabled={auth.isLoading}
          >
            Log In
          </Button>
        </Item>
      </StyledLoginForm>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  { loginUser: loginUser }
)(LoginForm);
