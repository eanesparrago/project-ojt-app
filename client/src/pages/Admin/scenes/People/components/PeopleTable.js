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
  }

  .area-peopleTable-body {
    /* border: 1px solid magenta; */
    flex-grow: 1;
    width: 100%;
  }

  .container-peopleTable-table-head {
    /* width: 100%; */
  }

  .container-peopleTable-table-head-row {
    background-color: ${p => p.theme.color.primary.light};
    /* width: 100%; */
  }

  .container-peopleTable-table-body-row {
    /* width: 100%; */
  }

  .item-peopleTable-filter {
    /* margin-left: auto; */
  }

  td,
  th {
    display: table-cell;
  }

  table {
    display: table;
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

        <Area NAME="peopleTable-body" as="table">
          <Container NAME="peopleTable-table-head" as="thead">
            <Container NAME="peopleTable-table-head-row" as="tr">
              <Item as="th">TH 1</Item>

              <Item as="th">TH 2</Item>

              <Item as="th">TH 3</Item>
            </Container>
          </Container>

          <Container as="tbody">
            <Container NAME="peopleTable-table-body-row" as="tr">
              <Item as="td">TD 1</Item>
              <Item as="td">TD 1</Item>
              <Item as="td">TD 1</Item>
            </Container>
            <Container NAME="peopleTable-table-body-row" as="tr">
              <Item as="td">TD 2</Item>
              <Item as="td">TD 2</Item>
              <Item as="td">TD 2</Item>
            </Container>
            <Container NAME="peopleTable-table-body-row" as="tr">
              <Item as="td">TD 3</Item>
              <Item as="td">TD 3</Item>
              <Item as="td">TD 3</Item>
            </Container>
          </Container>
        </Area>
      </StyledPeopleTable>
    );
  }
}

export default PeopleTable;
