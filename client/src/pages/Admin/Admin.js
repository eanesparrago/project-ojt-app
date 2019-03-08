import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { Transition } from "react-spring/renderprops";

import { Item, Area } from "src/layout";
import { FlashMessage } from "src/components/compounds";

import { Header, Sidebar } from "./components";

import Groups from "./scenes/Groups/Groups";
import People from "./scenes/People/People";
import Announcements from "./scenes/Announcements/Announcements";

const StyledAdmin = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  .area-admin-header {
    grid-area: header;
  }

  .area-admin-sidebar {
    grid-area: sidebar;
  }

  .area-admin-main {
    grid-area: main;
    background-color: ${p => p.theme.color.grey.light};
    overflow: auto;
    position: relative;
  }

  .item-admin-flashMessage {
    position: fixed;
    bottom: ${p => p.theme.size.xl};
    right: ${p => p.theme.size.base};
    width: ${p => p.theme.incrementFixed(24)};
  }
`;

export class Admin extends Component {
  render() {
    const { match } = this.props;

    return (
      <StyledAdmin>
        {/* >>> Header */}
        <Area NAME="admin-header">
          <Header />
        </Area>

        {/* >>> Sidebar */}
        <Area NAME="admin-sidebar">
          <Sidebar />
        </Area>

        {/* >>> Main */}
        <Area NAME="admin-main">
          <Switch>
            <Route path={`${match.url}/groups`} render={Groups} />

            <Route path={`${match.url}/people`} render={People} />

            <Route path={`${match.url}/announcements`} render={Announcements} />
          </Switch>
        </Area>

        <Item NAME="admin-flashMessage">
          <FlashMessage />
        </Item>
      </StyledAdmin>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(Admin)
);
