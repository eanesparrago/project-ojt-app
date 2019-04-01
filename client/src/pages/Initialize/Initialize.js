import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { LoadingScene } from "src/components/compounds";

import InitializeForm from "./InitializeForm";

import { logoutUser } from "src/services/session/actions/authActionCreators";
import { getCurrentUser } from "src/services/session/actions/userActionCreators";

const StyledInitialize = styled.div`
  min-height: 100%;
  padding: var(--size-l);
  background-color: ${p => p.theme.color.white};
  display: flex;
  flex-flow: column;
  align-items: center;

  .item-initialize-welcome {
    text-align: center;
  }
`;

export class Initialize extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const {
      auth: { user },
      user: { data, isLoading },
      logoutUser
    } = this.props;

    return (
      <StyledInitialize>
        <Item margin="stack-l">
          <Button variant="secondary" onClick={logoutUser}>
            Logout
          </Button>
        </Item>

        <Item NAME="initialize-welcome" margin="stack-l">
          <Typography variant="display-1">
            SPi Attendance Application
          </Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="body">
            Your username is {user.username}.
          </Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="base">
            Please complete the form below to initialize your user account.
          </Typography>
        </Item>

        {isLoading || !data ? (
          <Item padding="inset-base">
            <LoadingScene />
          </Item>
        ) : (
          <InitializeForm data={data} />
        )}
      </StyledInitialize>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    user: state.user
  }),
  {
    logoutUser: logoutUser,
    getCurrentUser: getCurrentUser
  }
)(Initialize);
