import React, { Component } from "react";
import styled from "styled-components";
import { Route, withRouter, Link } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";

import CreatePerson from "./scenes/CreatePerson";
import PeopleTable from "./components/PeopleTable";

const StyledPeople = styled.div`
  /* border: 1px solid magenta; */
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;

  .area-people-content-header {
    background-color: ${p => p.theme.color.white};
    border-bottom: 1px solid ${p => p.theme.color.dark};
    padding-bottom: ${p => p.theme.size.s};
  }

  .area-people-content-body {
    /* border: 1px solid blue; */
    overflow: auto;
    width: 100%;
    max-height: 100%;
  }

  .container-people-create-person {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .container-people-person {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export class People extends Component {
  render() {
    const { match } = this.props;

    return (
      <StyledPeople>
        <Area NAME="people-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">
                <Item
                  inline
                  center
                  margin="inline-base"
                  style={{ width: "3rem" }}
                >
                  <i className="fas fa-users" />
                </Item>
                People
              </Typography>
            </Item>

            <Item margin="wrap-base">
              <Button
                variant="primary"
                as={Link}
                to={`${match.url}/create-person`}
              >
                <Item margin="inline-s">
                  <i className="fas fa-plus" />
                </Item>
                Create Person
              </Button>
            </Item>
          </Box>
        </Area>

        <Area NAME="people-content-body" padding="inset-base">
          <PeopleTable />
        </Area>

        <Route
          path={`${match.url}/create-person`}
          render={() => (
            <Container NAME="people-create-person">
              <CreatePerson />
            </Container>
          )}
        />

        {/* <Route
          path={`${match.url}/technical-support-group`}
          render={() => (
            <Container NAME="people-person">
              <Department />
            </Container>
        />
          )} */}
      </StyledPeople>
    );
  }
}

export default withRouter(People);
