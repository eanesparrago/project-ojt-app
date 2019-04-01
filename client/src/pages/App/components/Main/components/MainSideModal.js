import React from "react";
import styled from "styled-components";
import { animated } from "react-spring/renderprops";
import { withRouter, Route } from "react-router-dom";

const StyledMainSideModal = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
`);

const MainSideModal = ({
  match,
  routePath,
  children
}) => {
  return (
    <Route
      path={`${match.url}${routePath}`}
      render={() => <StyledMainSideModal>{children}</StyledMainSideModal>}
    />
  );
};

export default withRouter(MainSideModal);
