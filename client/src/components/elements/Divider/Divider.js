import React from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  width: 100%;
  height: var(--size-xxs);
  background-color: ${p => p.theme.color.primary.accent};
  background-image: linear-gradient(
    to right,
    ${p => p.theme.color.primary.accent},
    ${p => p.theme.color.primary.light}
  );
`;

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;
