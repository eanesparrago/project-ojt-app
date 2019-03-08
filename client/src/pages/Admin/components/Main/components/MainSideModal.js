import React from "react";
import styled from "styled-components";
import { Transition, animated } from "react-spring/renderprops";
import { withRouter, Route, Switch } from "react-router-dom";

const StyledMainCreateModal = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`);

const MainCreateModal = ({
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

  console.log(match.url, routePath, "-", key);

  return (
    <Transition
      native
      items={location}
      keys={key}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
    >
      {loc => style => (
        <Switch location={loc}>
          <Route
            path={`${match.url}${routePath}`}
            render={() => (
              <StyledMainCreateModal style={style}>
                {children}
              </StyledMainCreateModal>
            )}
          />
        </Switch>
      )}
    </Transition>
  );
};

export default withRouter(MainCreateModal);
