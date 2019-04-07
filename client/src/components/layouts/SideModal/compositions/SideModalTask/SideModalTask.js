import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { SideModal } from "src/components/layouts";
import TaskInformation from "./components/TaskInformation";
import TaskEdit from "./components/TaskEdit";

import { getTask } from "src/services/session/actions/taskActionCreators";
import { deleteTask } from "src/services/session/actions/tasksActionCreators";

export class SideModalTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  componentDidMount() {
    const { match, getTask } = this.props;

    getTask(match.params.id);
  }

  handleToggleEdit = () => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  handleDelete = e => {
    e.preventDefault();
    const { deleteTask, match, history } = this.props;

    deleteTask(match.params.id).then(() => {
      history.goBack();
    });
  };

  render() {
    const {
      task: { isLoading, data }
    } = this.props;
    const { ...state } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Task" />

        <SideModal.Body isLoading={isLoading}>
          <Box margin="stack-l">
            {state.isEditOpen ? (
              <Button variant="secondary" icon onClick={this.handleToggleEdit}>
                <i className="fas fa-arrow-left" />
                <span id="hidden">Back</span>
              </Button>
            ) : (
              <Fragment>
                <Item margin="inline-base">
                  <Button variant="secondary" onClick={this.handleToggleEdit}>
                    Edit Task
                  </Button>
                </Item>
                <Item>
                  <Button variant="secondary" onClick={this.handleDelete}>
                    Delete Task
                  </Button>
                </Item>
              </Fragment>
            )}
          </Box>

          {(() => {
            if (isLoading) {
              return <Typography variant="base">Loading</Typography>;
            }
            if (!data) {
              return <Typography variant="base">An error occurred</Typography>;
            }
            if (state.isEditOpen) {
              return <TaskEdit handleToggleEdit={this.handleToggleEdit} />;
            }
            if (data) {
              return <TaskInformation taskData={data} />;
            }
          })()}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      task: state.task
    }),
    {
      getTask: getTask,
      deleteTask: deleteTask
    }
  )(SideModalTask)
);
