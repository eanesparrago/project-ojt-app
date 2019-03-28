import React, { Component } from "react";
import { Main } from "src/pages/App/components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { Item } from "src/components/blocks";
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
  padding: var(--size-base);
  background-color: ${p => p.theme.color.white};
  min-height: 100%;
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
    const {
      user: { data, isLoading }
    } = this.props;

    return (
      <Main>
        <Main.Header title="My Profile" />

        <Main.Body isLoading={isLoading}>
          {data && (
            <StyledProfileBody>
              <Item margin="stack-base">
                <NavMenu
                  buttons={
                    data.role === enums.roles.TRAINEE
                      ? buttons.concat(traineeButtons)
                      : buttons
                  }
                />
              </Item>

              <Person data={data} afterEdit={this.afterEdit} />
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
