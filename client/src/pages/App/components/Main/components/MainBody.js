import React from "react";
import styled from "styled-components";
import { animated } from "react-spring/renderprops";

import { Item } from "src/components/blocks";
import { LoadingScene } from "src/components/compounds";

const StyledMainBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: ${p => (p.isLoading ? "hidden" : "auto")};
  background-color: ${p => p.theme.color.grey.light};
  overflow-x: hidden;

  .mainBody-children {
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .item-design-circle {
    width: ${p => p.theme.increment(36)};
    height: ${p => p.theme.increment(36)};
    border-radius: 1000rem;
    background-color: ${p => p.theme.color.primary.light};
    position: fixed;
    right: ${p => p.theme.increment(-12)};
    bottom: ${p => p.theme.increment(-12)};
    z-index: 0;
  }
`;

const MainBody = ({ isLoading, children }) => {
  return (
    <StyledMainBody isLoading={isLoading}>
      {isLoading && <MainBodyLoading />}

      <div className="mainBody-children">{children}</div>

      <Item NAME="design-circle" />
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
