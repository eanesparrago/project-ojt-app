import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Main } from "src/pages/App/components";

import { getPeople } from "src/services/session/actions/peopleActionCreators";

import enums from "src/services/enums";

export class Requests extends Component {
  componentDidMount() {
    const { getPeople } = this.props;

    getPeople();
  }

  render() {
    const {
      people: { data, isLoading },
      history,
      match
    } = this.props;

    let scheduleUpdates = [];
    let leaveRequests = [];

    if (data) {
      scheduleUpdates = JSON.parse(JSON.stringify(data)).filter(
        person =>
          person.role === enums.roles.TRAINEE &&
          person.roleData.scheduleUpdateRequest.isActive === true
      );
      scheduleUpdates.forEach(
        scheduleUpdate => (scheduleUpdate.type = "scheduleUpdate")
      );

      leaveRequests = JSON.parse(JSON.stringify(data)).filter(
        person =>
          person.role === enums.roles.TRAINEE &&
          person.roleData.leaveRequests.length > 0
      );
      leaveRequests.forEach(
        leaveRequest => (leaveRequest.type = "leaveRequest")
      );
    }

    const columns = [
      {
        Header: "Username",
        accessor: "username",
        filterable: true
      },
      {
        id: "groupName",
        Header: "Group",
        accessor: d => d.roleData.group.name
      },
      {
        id: "request",
        Header: "Request",
        accessor: d =>
          d.type === "scheduleUpdate" ? "Schedule Update" : "Leave Request"
      }
    ];

    return (
      <Main>
        <Main.Header title="Requests" />

        <Main.Body isLoading={isLoading}>
          {data && (
            <StyledTable>
              <ReactTable
                data={scheduleUpdates.concat(leaveRequests)}
                showPageSizeOptions={false}
                resizable={false}
                defaultPageSize={14}
                columns={columns}
                className="-highlight"
                getTrProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: () => {
                      history.push(
                        `${match.url}/person/${rowInfo.original._id}/${
                          rowInfo.original.type === "scheduleUpdate"
                            ? "schedule"
                            : "leaves"
                        }`
                      );
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
  box-shadow: ${p => p.theme.shadow[1]};
  padding: var(--size-base);
  border-radius: var(--size-base);

  .item-people-role {
    width: 50%;
  }
`;
export default withRouter(
  connect(
    state => ({
      people: state.people
    }),
    { getPeople: getPeople }
  )(Requests)
);
