import React from "react";
import styled from "styled-components";
import { animated } from "react-spring/renderprops";

const StyledSideModalContent = animated(styled.div`
  grid-area: content;
  background-color: ${p => p.theme.color.white};
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
`);

const SideModalContent = ({ children }) => {
  return <StyledSideModalContent>{children}</StyledSideModalContent>;
};

export default SideModalContent;
