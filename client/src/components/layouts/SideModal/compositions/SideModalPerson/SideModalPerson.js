import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { SideModal } from "src/components/layouts";
import { Person } from "src/components/fragments";

import { getPerson } from "src/services/session/actions/personActionCreators";
import { getPeople } from "src/services/session/actions/peopleActionCreators";
import { getGroups } from "src/services/session/actions/groupsActionCreators";
import enums from "src/services/enums";

const buttons = [
  { title: "Account", icon: "fas fa-user-circle", to: "" }
  // {
  //   title: "Activity",
  //   icon: "fas fa-list-ul",
  //   to: "/activity"
  // }
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
    icon: "fas fa-check",
    to: "/tasks"
  }
];

export class SideModalPerson extends Component {
  componentDidMount() {
    const { getPerson, match } = this.props;

    getPerson(match.params.id);
  }

  render() {
    const { person } = this.props;

    return (
      <SideModal>
        {person.data ? (
          <SideModal.Header
            title={person.data.username}
            buttons={
              person.data.role === enums.roles.TRAINEE
                ? buttons.concat(traineeButtons)
                : buttons
            }
          />
        ) : (
          <SideModal.Header />
        )}

        <SideModal.Body isLoading={person.isLoading}>
          {person.data && <Person person={person} />}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      person: state.person
    }),
    {
      getPerson: getPerson,
      getPeople: getPeople,
      getGroups: getGroups
    }
  )(SideModalPerson)
);
