import React, { Component } from "react";
import styled from "styled-components";
import { Typography } from "../../components/elements";
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
  background-color: ${p => p.theme.color.light};

  .container-login {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-color: ${p => p.theme.color.white};
    width: ${p => p.theme.increment(18)};
    height: ${p => p.theme.increment(18)};
    border-radius: var(--size-base);
    box-shadow: ${p => p.theme.shadow[2]};
    z-index: 1;
  }

  .item-design-circle-1 {
    width: ${p => p.theme.increment(18)};
    height: ${p => p.theme.increment(18)};
    background-color: ${p => p.theme.color.primary.main};
    border-radius: 100%;
    position: absolute;
    transform: translate(12rem, -6rem);
  }
  .item-design-circle-2 {
    width: ${p => p.theme.increment(8)};
    height: ${p => p.theme.increment(8)};
    background-color: ${p => p.theme.color.primary.dark};
    border-radius: 100%;
    position: absolute;
    transform: translate(-12rem, 12rem);
  }
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
        <Container NAME="login">
          <Item margin="stack-l">
            <Typography as="h1" variant="display-1">
              Parousía
            </Typography>
          </Item>

          <Container>
            <LoginForm />
          </Container>
        </Container>

        <Item NAME="design-circle-1" />
        <Item NAME="design-circle-2" />
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
