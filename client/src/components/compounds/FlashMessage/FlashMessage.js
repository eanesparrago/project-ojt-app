import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Transition, animated } from "react-spring/renderprops";

import { Item } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";

import { unsetFlashMessage } from "src/services/session/actions/appActionCreators";

const StyledFlashMessage = animated(styled.div`
  width: 100%;
  background-color: ${p => p.theme.color.white};
  border: 2px solid
    ${p =>
      p.type === "success"
        ? p.theme.color.primary.accent
        : p.theme.color.error};
  border-radius: ${p => p.theme.size.base};
  padding: ${p => p.theme.size.m};
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

const FlashMessage = ({
  flashMessage: {
    message: { message, type },
    isOpen
  },
  unsetFlashMessage
}) => {
  return (
    <Transition
      native
      items={isOpen}
      key={item => item}
      from={{ opacity: 0, transform: "translateX(100%)" }}
      enter={{ opacity: 1, transform: "translateX(0)" }}
      leave={{ opacity: 0, transform: "translateX(100%)" }}
    >
      {show =>
        show &&
        (style => (
          <StyledFlashMessage type={type} style={style}>
            <Item margin="inline-m">
              <Typography variant="base">{message}</Typography>
            </Item>

            <Item>
              <Button variant="text" icon onClick={unsetFlashMessage}>
                <i className="fas fa-times" />
              </Button>
            </Item>
          </StyledFlashMessage>
        ))
      }
    </Transition>
  );
};

export default connect(
  state => ({
    flashMessage: state.app.flashMessage
  }),
  {
    unsetFlashMessage: unsetFlashMessage
  }
)(FlashMessage);
