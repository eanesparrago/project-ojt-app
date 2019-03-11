import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";

const StyledSideModalHeader = styled.header`
  background-color: ${p => p.theme.color.grey.light};
  display: grid;
  grid-template-columns: 1fr auto;
  padding: var(--size-base);
  padding-bottom: 0;

  .item-sideModalHeader-close {
    margin-left: auto;
  }
`;

const SideModalHeader = ({
  title = "",
  buttons = [],
  isLoading = false,
  match,
  history
}) => {
  return (
    <StyledSideModalHeader>
      {!isLoading && (
        <Box wrap>
          <Item margin="wrap-base">
            <Typography variant="display-1" as="h1">
              {title}
            </Typography>
          </Item>

          {buttons.map((button, i) => (
            <Item margin="wrap-m" key={i}>
              <Button
                variant="text"
                as={Link}
                to={`${match.url}${button.to}`}
                replace
              >
                {button.icon && (
                  <Item center margin="inline-s">
                    <i className={button.icon} />
                  </Item>
                )}
                {button.title}
              </Button>
            </Item>
          ))}
        </Box>
      )}

      <Item NAME="sideModalHeader-close" margin="stack-base">
        <Button
          variant="secondary"
          icon
          rounded
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="fas fa-times" />
          <span id="hidden">Close</span>
        </Button>
      </Item>
    </StyledSideModalHeader>
  );
};

export default withRouter(SideModalHeader);
