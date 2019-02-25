import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { TextInput, SelectInput } from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledPeopleTable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.white};
  border: 1px solid ${p => p.theme.color.dark};
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
    overflow: auto;
  }

  .container-peopleTable-table-head {
  }

  .container-peopleTable-table-body {
    /* border: 1px solid magenta; */
 
  }

  .container-peopleTable-table-head-row {
    /* background-color: ${p => p.theme.color.grey.light}; */
    color: ${p => p.theme.color.primary.main};
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
   }

  .container-peopleTable-table-body-row {
    border-bottom: 1px solid ${p => p.theme.color.primary.light};
  }

  .item-peopleTable-filter {
  }

  .item-peopleTable-username {
    color: ${p => p.theme.color.primary.main};

    &:hover {
      color: ${p => p.theme.color.primary.dark};
    }
  }

  td,
  th {
    display: table-cell;
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
    const { match } = this.props;

    return (
      <StyledPeopleTable>
        <Area NAME="peopleTable-header" margin="stack-base">
          {/* <Item margin="inline-base">
            <Typography variant="display-2">Everyone</Typography>
          </Item> */}

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
                  <Typography variant="base">First Name</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Last Name</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Group</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Required Hours</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Remaining Hours</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Account Status</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Training Status</Typography>
                </Item>
                <Item as="th" padding="squish-l">
                  <Typography variant="base">Date Started</Typography>
                </Item>
              </Container>
            </Container>

            <Container NAME="peopleTable-table-body" as="tbody">
              {Array(20)
                .fill(null)
                .map((item, i) => (
                  <Container NAME="peopleTable-table-body-row" as="tr" key={i}>
                    <Item padding="squish-l" as="td">
                      <Item
                        NAME="peopleTable-username"
                        as={Link}
                        to={`${match.url}/person/123`}
                      >
                        <Typography variant="base">usteven</Typography>
                      </Item>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Administrator</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Steven</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Universe</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Administrator</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">486</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">30</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Active</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">Away</Typography>
                    </Item>
                    <Item as="td" padding="squish-l">
                      <Typography variant="base">2019-02-20</Typography>
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

export default withRouter(PeopleTable);
