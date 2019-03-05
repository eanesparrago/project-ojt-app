import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Item } from "src/layout";
import { Button, Typography } from "src/components/elements";

import { unsetFlashMessage } from "src/services/session/actions/appActionCreators";

const StyledFlashMessage = styled.div`
  background-color: ${p => p.theme.color.white};
  border: 2px solid
    ${p =>
      p.type === "success"
        ? p.theme.color.primary.accent
        : p.theme.color.error};
  border-radius: ${p => p.theme.size.base};
  padding: ${p => p.theme.size.m};
  display: flex;
  align-items: center;
`;

const FlashMessage = ({
  data: {
    message: { message, type }
  },
  unsetFlashMessage
}) => {
  return (
    <StyledFlashMessage type={type}>
      <Item margin="inline-m">
        <Typography variant="base">{message}</Typography>
      </Item>

      <Item>
        <Button variant="text" icon onClick={unsetFlashMessage}>
          <i className="fas fa-times" />
        </Button>
      </Item>
    </StyledFlashMessage>
  );
};

export default connect(
  state => ({
    data: state.app.flashMessage
  }),
  {
    unsetFlashMessage: unsetFlashMessage
  }
)(FlashMessage);
