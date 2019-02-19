import React, { Component } from "react";
import styled from "styled-components";
import { Spring, Transition, animated } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";

import DepartmentCard from "./components/DepartmentCard";
import Department from "./scenes/Department";
import CreateDepartment from "./scenes/CreateDepartment";

const StyledDepartments = styled.div`
  /* border: 1px solid magenta; */
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;

  .area-departments-content-header {
    background-color: ${p => p.theme.color.white};
    border-bottom: 1px solid ${p => p.theme.color.dark};
    padding-bottom: ${p => p.theme.size.s};
  }

  .area-departments-content-body {
    /* border: 1px solid blue; */
    overflow: auto;
    width: 100%;
    max-height: 100%;
  }

  .container-departments-create-department {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .container-departments-department {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export class Departments extends Component {
  state = {
    isModalOpen: false
  };

  handleModalToggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { match, location } = this.props;

    return (
      <StyledDepartments>
        <Area NAME="departments-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">
                <Item
                  inline
                  center
                  margin="inline-base"
                  style={{ width: "3rem" }}
                >
                  <i className="fas fa-briefcase" />
                </Item>
                Departments
              </Typography>
            </Item>

            <Item margin="wrap-base">
              <Button
                variant="primary"
                as={Link}
                to={`${match.url}/create-department`}
              >
                <Item margin="inline-s">
                  <i className="fas fa-plus" />
                </Item>
                Create Department
              </Button>
            </Item>
          </Box>
        </Area>

        <Area NAME="departments-content-body" padding="inset-base">
          <Box wrap>
            <Item margin="wrap-base">
              <DepartmentCard />
            </Item>

            <Item margin="wrap-base">
              <DepartmentCard />
            </Item>

            <Item margin="wrap-base">
              <DepartmentCard />
            </Item>

            <Item margin="wrap-base">
              <DepartmentCard />
            </Item>

            <Item margin="wrap-base">
              <DepartmentCard />
            </Item>
          </Box>
        </Area>

        {/* >>> Create Department Modal */}
        {/* <Route
          path={`${match.url}/create-department`}
          render={() => (
            <Container NAME="departments-create-department">
              <CreateDepartment />
            </Container>
          )}
        /> */}

        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ transform: "translateX(-100%)" }}
          enter={{ transform: "translateX(0%)" }}
          leave={{ transform: "translateX(-100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/create-department`}
                render={() => (
                  <Container
                    NAME="departments-create-department"
                    animate={style}
                  >
                    <CreateDepartment />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        {/* >>> Department Modal */}
        {/* <Route
          path={`${match.url}/technical-support-group`}
          render={() => (
            <Container NAME="departments-department">
              <Department />
            </Container>
          )}
        /> */}

        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ transform: "translateY(100%)" }}
          enter={{ transform: "translateY(0%)" }}
          leave={{ transform: "translateY(100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/technical-support-group`}
                render={() => (
                  <Container NAME="departments-department" animate={style}>
                    <Department />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>
      </StyledDepartments>
    );
  }
}

export default withRouter(Departments);
