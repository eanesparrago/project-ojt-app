import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Table } from "src/components/layouts";

export class TableTasks extends Component {
  render() {
    const { tasksData } = this.props;

    return (
      <Table>
        <Table.Header />

        <Table.Body
          headings={[
            {
              property: "content",
              title: "Task"
            },
            {
              property: "ticketNumber",
              title: "Ticket Number"
            },
            {
              property: "dateCreated",
              title: "Date Created",
              type: "date"
            }
          ]}
          data={tasksData}
          route="/task"
        />
      </Table>
    );
  }
}

TableTasks.propTypes = {
  tasksData: PropTypes.array
};

export default TableTasks;
