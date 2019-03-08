import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import { withRouter, Route, Switch } from "react-router-dom";

const StyledMainFullModal = animated(styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`);

const MainFullModal = ({
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
    <Transition
      native
      items={location}
      keys={key}
      from={{ transform: "translateY(100%)", opacity: "0" }}
      enter={{ transform: "translateY(0%)", opacity: "1" }}
      leave={{ transform: "translateY(100%)", opacity: "0" }}
    >
      {loc => style => (
        <Switch location={loc}>
          <Route
            path={`${match.url}${routePath}`}
            render={() => (
              <StyledMainFullModal style={style}>
                {children}
              </StyledMainFullModal>
            )}
          />
        </Switch>
      )}
    </Transition>
  );
};

export default withRouter(MainFullModal);
