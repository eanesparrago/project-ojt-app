import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

import { Item, Box } from "src/layout";
import { Typography, Button } from "src/components/elements";

const StyledMainHeader = styled.header`
  background-color: ${p => p.theme.color.white};
  border-bottom: 2px solid ${p => p.theme.color.primary.accent};
  padding: var(--size-base);
  padding-bottom: 0;
`;

const MainHeader = ({
  title = "Title",
  buttonText = "Button Text",
  buttonPath,
  match
}) => {
  return (
    <StyledMainHeader>
      <Box wrap>
        <Item margin="wrap-base">
          <Typography variant="display-1">{title}</Typography>
        </Item>

        <Item margin="wrap-base">
          <Button variant="primary" as={Link} to={`${match.url}${buttonPath}`}>
            <Item margin="inline-s">
              <i className="fas fa-plus" />
            </Item>
            {buttonText}
          </Button>
        </Item>
      </Box>
    </StyledMainHeader>
  );
};

export default withRouter(MainHeader);
