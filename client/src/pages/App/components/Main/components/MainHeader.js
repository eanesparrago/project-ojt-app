import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import includes from "lodash/includes";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";

const StyledMainHeader = styled.header`
  background-color: ${p => p.theme.color.white};
  border-bottom: 2px solid ${p => p.theme.color.primary.accent};
  padding: var(--size-base);
  padding-bottom: 0;
`;

const MainHeader = ({
  title = "Title",
  buttonText,
  buttonPath,
  buttonPermissions,
  match,
  children,
  auth: {
    user: { role }
  }
}) => {
  return (
    <StyledMainHeader>
      <Box wrap>
        <Item margin="wrap-base">
          <Typography variant="display-1">{title}</Typography>
        </Item>

        {buttonText && includes(buttonPermissions, role) && (
          <Item margin="wrap-base">
            <Button
              variant="primary"
              as={Link}
              to={`${match.url}${buttonPath}`}
            >
              <Item margin="inline-s">
                <i className="fas fa-plus" />
              </Item>
              {buttonText}
            </Button>
          </Item>
        )}

        {children}
      </Box>
    </StyledMainHeader>
  );
};

export default withRouter(
  connect(
    state => ({
      auth: state.auth
    }),
    null
  )(MainHeader)
);
