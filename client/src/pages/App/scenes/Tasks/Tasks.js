import React, { Component } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Main } from "src/pages/App/components";

import { getOwnTasks } from "src/services/session/actions/tasksActionCreators";
import enums from "src/services/enums";

export class Tasks extends Component {
  componentDidMount() {
    const { getOwnTasks } = this.props;

    getOwnTasks();
  }

  render() {
    const {
      tasks: { data, isLoading },
      history,
      match
    } = this.props;

    const columns = [
      {
        Header: "Content",
        accessor: "content"
      },
      {
        Header: "Ticket Number",
        accessor: "ticketNumber",
        Cell: props => (props.value ? props.value : "N/A"),
        filterable: true
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
        Cell: props => format(props.value, "MM-DD-YYYY")
      }
    ];

    return (
      <Main>
        <Main.Header
          title="Tasks"
          buttonText="Create Task"
          buttonPath="/create-task"
          buttonPermissions={[enums.roles.TRAINEE]}
        />

        <Main.Body isLoading={isLoading}>
          {data && (
            <StyledTable>
              <ReactTable
                data={data}
                showPageSizeOptions={false}
                resizable={false}
                defaultPageSize={15}
                columns={columns}
                className="-highlight"
                getTrProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: () => {
                      history.push(`${match.url}/task/${rowInfo.original._id}`);
                    }
                  };
                }}
              />
            </StyledTable>
          )}
        </Main.Body>
      </Main>
    );
  }
}

const StyledTable = styled.div`
  margin: var(--size-base);
  background-color: ${p => p.theme.color.white};
`;

export default withRouter(
  connect(
    state => ({
      tasks: state.tasks
    }),
    {
      getOwnTasks: getOwnTasks
    }
  )(Tasks)
);
