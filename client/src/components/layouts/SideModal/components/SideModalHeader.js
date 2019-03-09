import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";

import { SideModalContext } from "../SideModal";

const StyledSideModalHeader = styled.header`
  background-color: ${p => p.theme.color.grey.light};
  display: flex;
  padding: var(--size-base);

  .item-sideModalHeader-close {
    margin-left: auto;
  }
`;

const SideModalHeader = ({ title = "Title", children, history }) => {
  return (
    <StyledSideModalHeader>
      {children}
      <Item>
        <Typography variant="display-1" as="h1">
          {title}
        </Typography>
      </Item>

      <Item NAME="sideModalHeader-close">
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
