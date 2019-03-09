import React from "react";
import styled from "styled-components";

const StyledInputGroupInput = styled.div`
  width: ${p => p.theme.incrementFixed(16)};
`;

const InputGroupInput = ({ children }) => {
  return <StyledInputGroupInput>{children}</StyledInputGroupInput>;
};

export default InputGroupInput;
