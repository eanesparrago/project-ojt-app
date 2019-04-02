import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";
import { TableTasks } from "src/components/layouts/Table/compositions";

import { getOwnTasks } from "src/services/session/actions/tasksActionCreators";
import enums from "src/services/enums";

export class Tasks extends Component {
  componentDidMount() {
    const { getOwnTasks } = this.props;

    getOwnTasks();
  }

  render() {
    const {
      tasks: { data, isLoading }
    } = this.props;

    return (
      <Main>
        <Main.Header
          title="Tasks"
          buttonText="Create Task"
          buttonPath="/create-task"
          buttonPermissions={[enums.roles.TRAINEE]}
        />

        <Main.Body isLoading={isLoading}>
          {data && <TableTasks tasksData={data} />}
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks
  }),
  {
    getOwnTasks: getOwnTasks
  }
)(Tasks);
