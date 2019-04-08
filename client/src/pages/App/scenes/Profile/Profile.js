import React, { Component } from "react";
import { Main } from "src/pages/App/components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Area } from "src/components/blocks";
import { NavMenu } from "src/components/compounds";
import { Person } from "src/components/fragments";

import { getCurrentUser } from "src/services/session/actions/userActionCreators";
import enums from "src/services/enums";

const buttons = [
  { title: "Account", icon: "fas fa-user-circle", to: "" },
  {
    title: "Activity",
    icon: "fas fa-list-ul",
    to: "/activity"
  }
];

const traineeButtons = [
  {
    title: "Schedule",
    icon: "far fa-calendar-alt",
    to: "/schedule"
  },
  {
    title: "DTR",
    icon: " far fa-clock",
    to: "/daily-time-record"
  },
  {
    title: "Tasks",
    icon: "far fa-check-circle",
    to: "/tasks"
  }
];

const StyledProfileBody = styled.div`
  background-color: ${p => p.theme.color.white};
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;

  .area-menu {
    background-color: ${p => p.theme.color.grey.light};
    padding-bottom: 0;
  }

  .area-person {
    overflow-y: auto;
  }
`;

export class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  afterEdit = () => {
    const { getCurrentUser } = this.props;

    getCurrentUser();
  };

  render() {
    const { user } = this.props;

    return (
      <Main>
        <Main.Header title="My Profile" />

        <Main.Body isLoading={user.isLoading}>
          {user.data && (
            <StyledProfileBody>
              <Area NAME="menu" padding="squish-base">
                <NavMenu
                  buttons={
                    user.data.role === enums.roles.TRAINEE
                      ? buttons.concat(traineeButtons)
                      : buttons
                  }
                />
              </Area>

              <Area NAME="person" padding="inset-base">
                {user.data && (
                  <Person person={user} afterEdit={this.afterEdit} />
                )}
              </Area>
            </StyledProfileBody>
          )}
        </Main.Body>
      </Main>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: state.user
    }),
    { getCurrentUser: getCurrentUser }
  )(Profile)
);
