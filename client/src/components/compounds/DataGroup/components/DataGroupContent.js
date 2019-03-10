import React from "react";
import styled from "styled-components";

const StyledDataGroupContent = styled.div`
  width: ${p => p.theme.incrementFixed(16)};
`;

const DataGroupContent = ({ children }) => {
  return <StyledDataGroupContent>{children}</StyledDataGroupContent>;
};

export default DataGroupContent;
