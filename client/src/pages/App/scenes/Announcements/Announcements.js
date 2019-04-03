import React, { Component } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Main } from "src/pages/App/components";

import { getAnnouncements } from "src/services/session/actions/announcementsActionCreators";
import enums from "src/services/enums";

export class Announcements extends Component {
  componentDidMount() {
    this.props.getAnnouncements();
  }

  render() {
    const {
      announcements: { announcements, isLoading },
      history,
      match
    } = this.props;

    const columns = [
      {
        id: "username",
        Header: "Username",
        accessor: d => d.user.username,
        filterable: true
      },
      {
        id: "role",
        Header: "Role",
        accessor: d => d.user.role
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
        Cell: props => format(props.value, "MM-DD-YYYY")
      },
      {
        id: "group",
        Header: "Group",
        accessor: d => (d.group ? d.group.name : "All")
      },
      {
        Header: "Message",
        accessor: "message"
      }
    ];

    return (
      <Main>
        <Main.Header
          title="Announcements"
          buttonText="Create Announcement"
          buttonPath="/create-announcement"
          buttonPermissions={[
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR
          ]}
        />

        <Main.Body isLoading={isLoading}>
          {announcements && (
            <StyledTable>
              <ReactTable
                data={announcements}
                showPageSizeOptions={false}
                resizable={false}
                defaultPageSize={15}
                columns={columns}
                className="-highlight"
                getTrProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: () => {
                      history.push(
                        `${match.url}/announcement/${rowInfo.original._id}`
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
`;

export default withRouter(
  connect(
    state => ({
      announcements: state.announcements
    }),
    { getAnnouncements: getAnnouncements }
  )(Announcements)
);
