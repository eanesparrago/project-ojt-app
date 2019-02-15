import React, { Component } from "react";
import styled from "styled-components";
import { Button, Typography } from "../../components/elements";
import { TextInput } from "../../components/compounds";
import { Item, Container } from "../../layout";

import LoginForm from "./components/LoginForm";

const StyledLogin = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export class Login extends Component {
  render() {
    return (
      <StyledLogin>
        <Item margin="stack-l">
          <Typography as="h1" variant="display-1">SPi OJT App</Typography>
        </Item>

        <Container>
          <LoginForm />
        </Container>
      </StyledLogin>
    );
  }
}

export default Login;
