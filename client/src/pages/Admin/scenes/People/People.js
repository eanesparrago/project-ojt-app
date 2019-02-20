import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { Button, Typography } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";

import CreatePerson from "./scenes/CreatePerson";
import PeopleTable from "./components/PeopleTable";

import PersonModal from "src/pages/Admin/components/PersonModal/PersonModal";

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
    height: 100%;
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
    const { match, location } = this.props;

    return (
      <StyledPeople>
        <Area NAME="people-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">People</Typography>
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

        {/* >>> Content body */}
        <Area NAME="people-content-body" padding="inset-base">
          <PeopleTable />
        </Area>

        <Transition
          native
          items={location}
          keys={location.pathname
            .split("/")
            .slice(2, 4)
            .join("/")}
          from={{ transform: "translateX(-100%)" }}
          enter={{ transform: "translateX(0%)" }}
          leave={{ transform: "translateX(-100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/create-person`}
                render={() => (
                  <Container NAME="people-create-person" animate={style}>
                    <CreatePerson />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        <Transition
          native
          items={location}
          keys={location.pathname
            .split("/")
            .slice(2, 4)
            .join("/")}
          from={{ transform: "translateX(-100%)" }}
          enter={{ transform: "translateX(0%)" }}
          leave={{ transform: "translateX(-100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/person/:id`}
                render={() => (
                  <Container NAME="people-person" animate={style}>
                    <PersonModal />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>
      </StyledPeople>
    );
  }
}

export default withRouter(People);
