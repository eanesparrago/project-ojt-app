import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Item } from "src/components/blocks";
import { Typography } from "src/components/elements";
import TaskItem from "./TaskItem";

import enums from "src/services/enums";

import {
  getOwnTasks,
  getUserTasks
} from "src/services/session/actions/tasksActionCreators";

export class Tasks extends Component {
  componentDidMount() {
    const { auth, person, getOwnTasks, getUserTasks } = this.props;

    if (auth.user.role === enums.roles.TRAINEE) {
      getOwnTasks();
    } else {
      getUserTasks(person.data._id);
    }
  }

  render() {
    const {
      tasks: { data, isLoading }
    } = this.props;

    return (
      <Fragment>
        <Item margin="stack-l">
          <Typography variant="display-2">Tasks</Typography>
        </Item>

        {(() => {
          if (isLoading) {
            return <Typography variant="base">Loading</Typography>;
          }
          if (!data) {
            return <Typography variant="base">An error occurred</Typography>;
          }
          if (data.length > 0) {
            return data.map((task, i) => (
              <Item margin="stack-base" key={task._id}>
                <TaskItem taskData={task} previousTask={data[i - 1]} />
              </Item>
            ));
          }
          return <Typography variant="base">No tasks</Typography>;
        })()}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
    tasks: state.tasks,
    person: state.person
  }),
  {
    getOwnTasks: getOwnTasks,
    getUserTasks: getUserTasks
  }
)(Tasks);
