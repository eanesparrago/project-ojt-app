import React, { Component } from "react";
import { Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Item, Area } from "src/components/blocks";
import { Button } from "src/components/elements";
import { FlashMessage } from "src/components/compounds";
import PrivateRoute from "src/components/utils/PrivateRoute";

import { Header, Sidebar, SidebarMobile } from "./components";

import {
  Groups,
  People,
  Announcements,
  Overview,
  Profile,
  Tasks,
  Requests,
  SupervisorRequests
} from "./scenes";

import enums from "src/services/enums";

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  @media (max-width: ${p => p.theme.breakpoint.desktopM}) {
    grid-template-areas:
      "header"
      "main";

    grid-template-rows: auto 1fr;
    grid-template-columns: auto;
  }

  .area-app-header {
    grid-area: header;
  }

  .area-app-sidebar {
    grid-area: sidebar;
    overflow-y: auto;

    @media (max-width: ${p => p.theme.breakpoint.desktopM}) {
      display: none;
    }
  }

  .area-app-sidebar-mobile {
    display: none;

    @media (max-width: ${p => p.theme.breakpoint.desktopM}) {
      display: block;
      grid-area: main;
    }
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

  .item-app-menu-button {
    display: none;
    position: fixed;
    bottom: ${p => p.theme.size.xl};
    right: ${p => p.theme.size.base};
    z-index: 1000;

    @media (max-width: ${p => p.theme.breakpoint.desktopM}) {
      display: block;
    }
  }
`;

export class App extends Component {
  state = {
    isMobileMenuOpen: false
  };

  handleMobileMenuToggle = e => {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  };

  componentDidMount() {
    const {
      auth: { user },
      history
    } = this.props;

    if (
      user.role !== enums.roles.ADMINISTRATOR &&
      user.roleData.isInitialized === false
    ) {
      history.push("/initialize");
    }
  }

  render() {
    const { match, auth } = this.props;
    const { ...state } = this.state;

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

        <Area NAME="app-sidebar-mobile">
          <SidebarMobile
            isMobileMenuOpen={state.isMobileMenuOpen}
            handleMobileMenuToggle={this.handleMobileMenuToggle}
          />
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
                enums.roles.EMPLOYEE,
                enums.roles.TRAINEE
              ]}
            />

            <PrivateRoute
              path={`${match.url}/group`}
              component={Overview}
              permittedRoles={[
                enums.roles.SUPERVISOR,
                enums.roles.EMPLOYEE,
                enums.roles.TRAINEE
              ]}
            />

            <PrivateRoute
              path={`${match.url}/profile`}
              component={Profile}
              permittedRoles={[
                enums.roles.SUPERVISOR,
                enums.roles.EMPLOYEE,
                enums.roles.ADMINISTRATOR,
                enums.roles.TRAINEE
              ]}
            />

            <PrivateRoute
              path={`${match.url}/tasks`}
              component={Tasks}
              permittedRoles={[enums.roles.TRAINEE]}
            />

            <PrivateRoute
              path={`${match.url}/requests`}
              component={Requests}
              permittedRoles={[enums.roles.ADMINISTRATOR]}
            />

            <PrivateRoute
              path={`${match.url}/supervisor-requests`}
              component={SupervisorRequests}
              permittedRoles={[enums.roles.SUPERVISOR]}
            />

            {auth.user.role === enums.roles.ADMINISTRATOR ? (
              <Redirect to={`${match.url}/groups`} />
            ) : (
              <Redirect to={`${match.url}/group`} />
            )}
          </Switch>
        </Area>

        <Item NAME="app-flashMessage">
          <FlashMessage />
        </Item>

        <Item NAME="app-menu-button">
          <Button variant="primary" icon onClick={this.handleMobileMenuToggle}>
            <i className="fas fa-bars" />
          </Button>
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
