import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import { withRouter, Route, Switch } from "react-router-dom";

const StyledMainFullModal = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`);

const MainFullModal = ({ location, match, routePath, children }) => {
  return (
    // <Transition
    //   native
    //   items={location}
    //   keys={location.pathname}
    //   from={{ transform: "translateY(100%)", opacity: "0" }}
    //   enter={{ transform: "translateY(0%)", opacity: "1" }}
    //   leave={{ transform: "translateY(100%)", opacity: "0" }}
    // >
    //   {loc => style => (
    //     <Switch location={loc}>
    <Route
      path={`${match.url}${routePath}`}
      render={() => (
        // <StyledMainFullModal style={style}>
        <StyledMainFullModal>{children}</StyledMainFullModal>
      )}
    />
    //     </Switch>
    //   )}
    // </Transition>
  );
};

export default withRouter(MainFullModal);
