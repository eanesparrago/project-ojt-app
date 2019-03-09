import React, { Component } from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops";

const StyledSideModalContent = animated(styled.div`
  grid-area: content;
  background-color: ${p => p.theme.color.white};
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
`);

const SideModalContent = ({ children }) => {
  return (
    <Spring
      delay={100}
      native
      from={{ transform: "translateX(-100%)" }}
      to={{ transform: "translateX(0)" }}
      immediate
    >
      {style => (
        <StyledSideModalContent style={style}>
          {children}
        </StyledSideModalContent>
      )}
    </Spring>
  );
};

export default SideModalContent;
