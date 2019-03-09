import React from "react";
import styled from "styled-components";

import { LoadingScene } from "src/components/compounds";

const StyledSideModalBody = styled.div`
  padding: var(--size-base);

  /* This is ideal but causes bug in Chrome. */
  overflow-y: auto;
`;

const SideModalBody = ({ isLoading = false, children, ...props }) => {
  return (
    <StyledSideModalBody {...props}>
      {isLoading ? <LoadingScene /> : children}
    </StyledSideModalBody>
  );
};

export default SideModalBody;
