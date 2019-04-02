import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";

import { getAnnouncements } from "src/services/session/actions/announcementsActionCreators";
import enums from "src/services/enums";

export class Tasks extends Component {
  render() {
    return (
      <Main>
        <Main.Header
          title="Tasks"
          buttonText="Create Task"
          buttonPath="/create-task"
          buttonPermissions={[enums.roles.TRAINEE]}
        />
        <Main.Body>Tasks</Main.Body>
      </Main>
    );
  }
}

export default Tasks;
