import React from "react";
import styled from "styled-components";
import { animated } from "react-spring/renderprops";

import { LoadingScene } from "src/components/compounds";

const StyledMainBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${p => (p.isLoading ? "hidden" : "auto")};
  background-color: ${p => p.theme.color.grey.light};
`;

const MainBody = ({ isLoading, children }) => {
  return (
    <StyledMainBody isLoading={isLoading}>
      {isLoading && <MainBodyLoading />}

      {children}
    </StyledMainBody>
  );
};

// ------------------------------------------------------------------------

const StyledMainBodyLoading = animated(styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  overflow-y: hidden;
  pointer-events: none;
`);

const MainBodyLoading = () => {
  return (
    <StyledMainBodyLoading>
      <LoadingScene />
    </StyledMainBodyLoading>
  );
};

// ------------------------------------------------------------------------

export default MainBody;
