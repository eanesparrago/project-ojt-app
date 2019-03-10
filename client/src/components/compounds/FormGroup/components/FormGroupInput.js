import React from "react";
import styled from "styled-components";

const StyledFormGroupInput = styled.div`
  width: ${p => p.theme.incrementFixed(16)};
`;

const FormGroupInput = ({ children }) => {
  return <StyledFormGroupInput>{children}</StyledFormGroupInput>;
};

export default FormGroupInput;
