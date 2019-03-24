import React from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  width: 100%;
  height: var(--size-xxs);
  background-color: ${p => p.theme.color.primary.accent};
`;

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;
