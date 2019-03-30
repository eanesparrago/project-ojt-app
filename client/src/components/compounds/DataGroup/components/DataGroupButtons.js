import React from "react";
import styled from "styled-components";

const StyledDataGroupButtons = styled.div`
  display: flex;

  * {
    margin-left: var(--size-s);
  }
`;

const DataGroupButtons = ({ children }) => {
  return <StyledDataGroupButtons>{children}</StyledDataGroupButtons>;
};

export default DataGroupButtons;
