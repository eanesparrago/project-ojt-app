import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";

const StyledNavMenu = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const NavMenu = ({ buttons, match }) => {
  return (
    <StyledNavMenu>
      {buttons.map((button, i) => (
        <Item margin="wrap-m" key={i}>
          <Button
            variant="text"
            as={NavLink}
            to={`${match.url}${button.to}`}
            activeClassName="active-underline"
            exact
            replace
          >
            {button.icon && (
              <Item center margin="inline-s">
                <i className={button.icon} />
              </Item>
            )}
            {button.title}
          </Button>
        </Item>
      ))}
    </StyledNavMenu>
  );
};

export default withRouter(NavMenu);
