import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import { withRouter, Route, Switch } from "react-router-dom";

const StyledMainSideModal = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`);

const MainSideModal = ({
  location,
  match,
  routePath,
  routeLevel,
  children
}) => {
  let key = location.pathname;
  if (routeLevel) {
    key = location.pathname.split("/").filter(a => a)[routeLevel];
  }

  return (
    // <Transition
    //   native
    //   items={location}
    //   keys={key}
    //   from={{ transform: "translateX(-100%)" }}
    //   enter={{ transform: "translateX(0%)" }}
    //   leave={{ transform: "translateX(-100%)" }}
    //   immediate
    // >
    //   {loc => style => (
    //     <Switch location={loc}>
    <Route
      path={`${match.url}${routePath}`}
      render={() => <StyledMainSideModal>{children}</StyledMainSideModal>}
    />
    //     </Switch>
    //   )}
    // </Transition>
  );
};

export default withRouter(MainSideModal);
