import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Item } from "src/layout";
import { Typography, Button } from "src/components/elements";

import { logoutUser } from "src/services/session/actions/authActionCreators";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${p => p.theme.color.grey.dark};
  color: ${p => p.theme.color.primary.main};
  padding: var(--size-m);
`;

const Header = ({ logoutUser }) => {
  return (
    <StyledHeader>
      <Item as={Link} to="/admin">
        <Typography variant="display-4">Parousía</Typography>
      </Item>

      <Item>
        <Button variant="text" onClick={logoutUser}>
          Log out
        </Button>
      </Item>
    </StyledHeader>
  );
};

export default connect(
  null,
  { logoutUser: logoutUser }
)(Header);
