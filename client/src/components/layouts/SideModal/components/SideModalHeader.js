import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { NavMenu } from "src/components/compounds";

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

          <NavMenu buttons={buttons} />
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
