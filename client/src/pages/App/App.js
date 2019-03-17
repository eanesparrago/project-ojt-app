import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Item, Area } from "src/components/blocks";
import { FlashMessage } from "src/components/compounds";
import PrivateRoute from "src/components/utils/PrivateRoute";

import { Header, Sidebar } from "./components";

import { Groups, People, Announcements } from "./scenes";

import enums from "src/services/enums";

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  .area-app-header {
    grid-area: header;
  }

  .area-app-sidebar {
    grid-area: sidebar;
    overflow-y: auto;
  }

  .area-app-main {
    grid-area: main;
    overflow-y: auto;
  }

  .item-app-flashMessage {
    position: fixed;
    bottom: ${p => p.theme.size.xl};
    right: ${p => p.theme.size.base};
    width: ${p => p.theme.incrementFixed(24)};
    z-index: 200;
  }
`;

export class App extends Component {
  componentDidMount() {
    const {
      auth: { user },
      history
    } = this.props;

    if (
      user.role === enums.roles.TRAINEE &&
      user.roleData.isInitialized === false
    ) {
      history.push("/initialize");
    }
  }

  render() {
    const { match } = this.props;

    return (
      <StyledApp>
        {/* >>> Header */}
        <Area NAME="app-header">
          <Header />
        </Area>

        {/* >>> Sidebar */}
        <Area NAME="app-sidebar">
          <Sidebar />
        </Area>

        {/* >>> Main */}
        <Area NAME="app-main">
          <Switch>
            <PrivateRoute
              path={`${match.url}/groups`}
              component={Groups}
              permittedRoles={[enums.roles.ADMINISTRATOR]}
            />

            <PrivateRoute
              path={`${match.url}/people`}
              component={People}
              permittedRoles={[
                enums.roles.ADMINISTRATOR,
                enums.roles.SUPERVISOR,
                enums.roles.EMPLOYEE
              ]}
            />

            <PrivateRoute
              path={`${match.url}/announcements`}
              component={Announcements}
              permittedRoles={[
                enums.roles.ADMINISTRATOR,
                enums.roles.SUPERVISOR,
                enums.roles.EMPLOYEE
              ]}
            />
          </Switch>
        </Area>

        <Item NAME="app-flashMessage">
          <FlashMessage />
        </Item>
      </StyledApp>
    );
  }
}

export default withRouter(
  connect(
    state => ({ auth: state.auth }),
    null
  )(App)
);
