import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Link, withRouter, Route, Switch } from "react-router-dom";
import { Button, Typography } from "src/components/elements";
import { Item, Box, Container, Area } from "src/layout";

import {
  PersonInformation,
  PersonEdit,
  PersonChangePassword
} from "./PersonModalComponents";

const StyledPerson = styled.div`
  /* border: 1px solid magenta; */
  width: 100%;
  min-height: 100%;
  position: relative;
  display: grid;
  grid-template-areas:
    "header back"
    "body back";
  grid-template-rows: auto 3fr;
  grid-template-columns: 3fr 1fr;

  > * {
    z-index: 100;
  }

  @media (max-width: ${p => p.theme.breakpoint.tabletLandscape}) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .area-person-header {
    grid-area: header;
    background-color: ${p => p.theme.color.grey.light};
    padding-bottom: ${p => p.theme.size.s};
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .container-person-close {
    margin-left: auto;
  }

  .area-person-body {
    /* border: 1px solid magenta; */
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    /* overflow-y: auto; */

    /* @media (max-width: ${p => p.theme.breakpoint.tabletLandscape}) {
      overflow-y: unset;
    } */
  }

  .area-person-back {
    grid-area: back;
    grid-column: 1 / -1;
    background-image: linear-gradient(
      to top right,
      ${p => p.theme.color.primary.dark},
      ${p => p.theme.color.primary.main}
    );
    opacity: 0.8;
    z-index: 99;

    @media (max-width: ${p => p.theme.breakpoint.tabletLandscape}) {
      display: none;
    }
  }

  .item-personInformation-divider {
    width: 100%;
    height: var(--size-xxs);
    background-color: ${p => p.theme.color.primary.light};
  }

  .item-personInformation-property {
    min-width: ${p => p.theme.incrementFixed(12)};
    max-width: ${p => p.theme.incrementFixed(12)};
  }

  /* >>> PersonEdit */
  .item-personEdit-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-personEdit-divider {
    width: 100%;
    height: var(--size-xxs);
    background-color: ${p => p.theme.color.primary.light};
  }

  .item-personEdit-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class Person extends Component {
  state = {
    person: {
      role: "",
      group: "",
      accountStatus: "",
      username: "",
      requiredHours: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      contactNumber: "",
      email: "",
      school: "",
      adviserName: "",
      adviserContactNumber: "",
      guardianName: "",
      guardianContactNumber: ""
    }
  };

  handleInputChange = e => {
    this.setState({
      person: { ...this.state.person, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { history, match } = this.props;

    return (
      <StyledPerson>
        {/* >>> AREA: header */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="person-header"
              padding="inset-base"
              as="header"
              animate={style}
            >
              <Box wrap>
                <Item margin="wrap-base">
                  <Item as={Link} to={`${match.url}`} replace>
                    <Typography variant="display-1" as="h1">
                      Steven Universe
                    </Typography>
                  </Item>
                </Item>

                <Item margin="wrap-base">
                  <Button
                    variant="secondary"
                    as={Link}
                    to={`${match.url}/edit-person`}
                    replace
                  >
                    <Item center margin="inline-s">
                      <i className="fas fa-edit" />
                    </Item>
                    Edit Person
                  </Button>
                </Item>

                <Item margin="wrap-base">
                  <Button
                    variant="secondary"
                    as={Link}
                    to={`${match.url}/change-password`}
                    replace
                  >
                    <Item center margin="inline-s">
                      <i className="fas fa-lock" />
                    </Item>
                    Change Password
                  </Button>
                </Item>
              </Box>

              <Container NAME="person-close">
                <Item>
                  <Button
                    variant="secondary"
                    icon
                    rounded
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <i className="fas fa-times" />
                  </Button>
                </Item>
              </Container>
            </Area>
          )}
        </Spring>

        {/* >>> AREA: body */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area NAME="person-body" padding="inset-base" animate={style}>
              <Switch>
                <Route
                  exact
                  path={`${match.url}`}
                  render={() => <PersonInformation />}
                />

                <Route
                  path={`${match.url}/edit-person`}
                  render={() => <PersonEdit />}
                />

                <Route
                  path={`${match.url}/change-password`}
                  render={() => <PersonChangePassword />}
                />
              </Switch>
            </Area>
          )}
        </Spring>

        <Area
          NAME="person-back"
          onClick={() => {
            history.goBack();
          }}
        />
      </StyledPerson>
    );
  }
}

export default withRouter(Person);
