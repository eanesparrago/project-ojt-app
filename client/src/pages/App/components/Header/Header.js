import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import TraineeWidget from "./components/TraineeWidget";
import Clock from "./components/Clock";

import { logoutUser } from "src/services/session/actions/authActionCreators";
import enums from "src/services/enums";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  background-color: ${p => p.theme.color.dark};
  color: ${p => p.theme.color.primary.main};
  padding: var(--size-m) var(--size-base);

  .item-logout {
    margin-left: auto;
  }
`;

const Header = ({ auth: { user }, logoutUser }) => {
  return (
    <StyledHeader>
      <Item>
        {user.role === enums.roles.TRAINEE ? <TraineeWidget /> : <Clock />}
      </Item>

      <Item NAME="logout">
        <Button variant="text" onClick={logoutUser}>
          Log out
        </Button>
      </Item>
    </StyledHeader>
  );
};

export default connect(
  state => ({
    auth: state.auth
  }),
  { logoutUser: logoutUser }
)(Header);
