import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import format from "date-fns/format";
import { connect } from "react-redux";

import { Button, Typography } from "src/components/elements";
import {  SelectInput, Avatar } from "src/components/compounds";
import { Item, Box, Container, Area } from "src/components/blocks";

const StyledPeopleTable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.white};
  /* border: 1px solid ${p => p.theme.color.dark}; */
  /* border-radius: ${p => p.theme.size.base};
  box-shadow: ${p => p.theme.shadow[1]}; */
  padding: var(--size-base);
  display: flex;
  flex-flow: column;

  .area-peopleTable-header {
    /* border: 1px solid magenta; */
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .area-peopleTable-body {
    /* border: 1px solid magenta; */
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
  }

  .container-peopleTable-table-head {
  }

  .container-peopleTable-table-body {
    /* border: 1px solid magenta; */
 
  }

  .container-peopleTable-table-head-row {
    color: ${p => p.theme.color.primary.dark};
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
   }

  .container-peopleTable-table-body-row {
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
  }

  .item-peopleTable-filter {
  }

  .item-peopleTable-username {
    color: ${p => p.theme.color.primary.dark};
    font-weight: 700;

    &:hover {
      color: ${p => p.theme.color.primary.main};
    }
  }

  td,
  th {
    display: table-cell;
    vertical-align: middle;
  }

  table {
    display: table;
    width: 100%;
  }

  thead {
    display: table-header-group;
  }

  tbody {
    display: table-row-group;
  }

  tr {
    display: table-row;
  }
`;

export class PeopleTable extends Component {
  render() {
    const { match, people } = this.props;

    return (
      <StyledPeopleTable>
        <Area NAME="peopleTable-header" margin="stack-base">
          <Item margin="inline-base">
            <SelectInput />
          </Item>

          <Item NAME="peopleTable-filter">
            <Button variant="secondary">
              <Item margin="inline-s">
                <i className="fas fa-filter" />
              </Item>
              Filter
            </Button>
          </Item>
        </Area>

        <Area NAME="peopleTable-body">
          <Container as="table">
            <Container NAME="peopleTable-table-head" as="thead">
              <Container NAME="peopleTable-table-head-row" as="tr">
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Username</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Role</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Group</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">First Name</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Last Name</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Account Status</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Date Created</Typography>
                </Item>
              </Container>
            </Container>

            <Container NAME="peopleTable-table-body" as="tbody">
              {people.data.map((person, i) => (
                <Container NAME="peopleTable-table-body-row" as="tr" key={i}>
                  <Item padding="squish-l" center as="td">
                    <Box>
                      <Item>
                        <Avatar
                          src={person.profilePictureUrl}
                          id={person._id}
                        />
                      </Item>

                      <Item NAME="peopleTable-username">
                        <Button
                          variant="text"
                          as={Link}
                          to={`${match.url}/person/${person._id}`}
                          full
                          left
                        >
                          {person.username}
                        </Button>
                        {/* <Typography variant="base"></Typography> */}
                      </Item>
                    </Box>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">{person.role}</Typography>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">
                      {person.roleData.group && person.roleData.group.name}
                    </Typography>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">{person.firstName}</Typography>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">{person.lastName}</Typography>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">
                      {person.isActive ? "Active" : "Inactive"}
                    </Typography>
                  </Item>

                  <Item as="td" center padding="squish-l">
                    <Typography variant="base">
                      {format(person.dateCreated, "MM-DD-YYYY")}
                    </Typography>
                  </Item>
                </Container>
              ))}
            </Container>
          </Container>
        </Area>
      </StyledPeopleTable>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      people: state.admin.people
    }),
    null
  )(PeopleTable)
);
