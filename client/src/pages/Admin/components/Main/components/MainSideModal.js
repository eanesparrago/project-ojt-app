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
  routeSplice,
  children
}) => {
  let key = location.pathname;
  if (routeSplice) {
    key = location.pathname
      .split("/")
      .slice(routeSplice[0], routeSplice[1])
      .join("/");
  }

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
