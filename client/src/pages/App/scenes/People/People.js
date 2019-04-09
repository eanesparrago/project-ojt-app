import React, { Component } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import round from "lodash/round";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Item } from "src/components/blocks";
import { SelectInput } from "src/components/compounds";
import { Main } from "src/pages/App/components";

import { getPeople } from "src/services/session/actions/peopleActionCreators";

import enums from "src/services/enums";

export class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "all"
    };
  }

  componentDidMount() {
    this.props.getPeople();
  }

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  render() {
    const {
      people: { data, isLoading },
      history,
      match
    } = this.props;
    const { ...state } = this.state;

    let filteredData = data;
    if (state.role !== "all") {
      filteredData = data.filter(person => person.role === state.role);
    }

    let columns = [
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
        id: "dateCreated",
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

    let traineeColumns = [
      {
        id: "groupName",
        Header: "Group",
        accessor: d => d.roleData.group.name,
        filterable: true
      },
      {
        id: "trainingDuration",
        Header: "Training Duration (Hours)",
        accessor: d => d.roleData.trainingDuration / 3600
      },
      {
        id: "timeRemaining",
        Header: "Time Remaining (Hours)",
        accessor: d =>
          round((d.roleData.trainingDuration - d.roleData.timeRendered) / 3600)
      }
    ];

    if (state.role === "trainee") {
      columns = columns.concat(traineeColumns);
    }

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
              <Item NAME="people-role" margin="stack-m">
                <SelectInput
                  value={state.role}
                  onChange={this.handleRoleChange}
                  options={[
                    {
                      label: "All roles",
                      value: "all"
                    },
                    { label: "Administrator", value: "administrator" },
                    { label: "Supervisor", value: "supervisor" },
                    { label: "Trainee", value: "trainee" },
                    { label: "Employee", value: "employee" }
                  ]}
                />
              </Item>

              <ReactTable
                data={filteredData}
                showPageSizeOptions={false}
                resizable={false}
                defaultPageSize={14}
                columns={columns}
                className="-highlight"
                sorted={[
                  {
                    id: "dateCreated",
                    desc: true
                  }
                ]}
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
  )(People)
);
