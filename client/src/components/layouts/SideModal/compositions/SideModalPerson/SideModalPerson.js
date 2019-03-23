import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";

import { SideModal } from "src/components/layouts";
import { Person } from "src/components/fragments";

import { getPerson } from "src/services/session/actions/personActionCreators";
import { getPeople } from "src/services/session/actions/peopleActionCreators";
import { getGroups } from "src/services/session/actions/groupsActionCreators";
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
    title: "Tasks",
    icon: "far fa-check-circle",
    to: "/tasks"
  }
];

export class SideModalPerson extends Component {
  componentDidMount() {
    const { getPerson, match } = this.props;

    getPerson(match.params.id);
  }

  afterEdit = () => {
    const {
      person: { data },
      getPerson,
      getPeople,
      getGroups
    } = this.props;

    getPerson(data._id);
    getPeople();
    getGroups();
  };

  render() {
    const {
      person: { data, isLoading }
    } = this.props;

    return (
      <SideModal>
        {data ? (
          <SideModal.Header
            title={data.username}
            buttons={
              data.role === enums.roles.TRAINEE
                ? buttons.concat(traineeButtons)
                : buttons
            }
          />
        ) : (
          <SideModal.Header />
        )}

        <SideModal.Body isLoading={isLoading}>
          {data && <Person data={data} afterEdit={this.afterEdit} />}
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
