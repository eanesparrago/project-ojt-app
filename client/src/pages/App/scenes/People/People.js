import React, { Component } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Main } from "src/pages/App/components";

import { getPeople } from "src/services/session/actions/peopleActionCreators";

import enums from "src/services/enums";

export class People extends Component {
  componentDidMount() {
    this.props.getPeople();
  }

  render() {
    const {
      people: { data, isLoading },
      history,
      match
    } = this.props;

    const columns = [
      {
        Header: "Username",
        accessor: "username",
        filterable: true
      },
      {
        Header: "Role",
        accessor: "role"
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
        Cell: props => format(props.value, "MM-DD-YYYY")
      },
      {
        Header: "Date Last Logged In",
        accessor: "dateLastLoggedIn",
        Cell: props =>
          props.value ? format(props.value, "MM-DD-YYYY") : "N/A",
        filterable: false
      }
    ];

    return (
      <Main>
        <Main.Header
          title="People"
          buttonText="Create Person"
          buttonPath="/create-person"
          buttonPermissions={[enums.roles.ADMINISTRATOR]}
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
                      history.push(
                        `${match.url}/person/${rowInfo.original._id}`
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
      people: state.people
    }),
    { getPeople: getPeople }
  )(People)
);
