import React, { Component } from "react";
import styled from "styled-components";
import { Button, Typography } from "../../components/elements";
import { TextInput } from "../../components/compounds";
import { Item, Container } from "src/components/blocks";
import { connect } from "react-redux";
import enums from "src/services/enums";

import LoginForm from "./components/LoginForm";

const StyledLogin = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    if (props.auth.isAuthenticated) {
      props.history.push(
        enums.roles.properties[props.auth.user.role].defaultRoute
      );
    }
  }

  render() {
    return (
      <StyledLogin>
        <Item margin="stack-l">
          <Typography as="h1" variant="display-1">
            Parousía
          </Typography>
        </Item>

        <Container>
          <LoginForm />
        </Container>
      </StyledLogin>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  null
)(Login);
