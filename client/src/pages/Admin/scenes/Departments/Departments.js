import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";

import DepartmentCard from "./components/DepartmentCard";
import Department from "./scenes/Department";
import CreateDepartment from "./scenes/CreateDepartment";
import { PersonModal } from "src/pages/Admin/components";
import sceneStyles from "src/pages/Admin/adminScenesStyles";

import { getDepartments } from "./data/departments/departmentsActionCreators";

const StyledDepartments = styled.div`
  ${sceneStyles};

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

  componentDidMount() {
    this.props.getDepartments();
  }

  handleModalToggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { match, location, data } = this.props;

    return (
      <StyledDepartments>
        <Area NAME="admin-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">Departments</Typography>
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

        <Area NAME="admin-content-body" padding="inset-base">
          <Box wrap>
            {data.departments.map(department => (
              <Item margin="wrap-base" key={department._id}>
                <DepartmentCard data={department} />
              </Item>
            ))}
          </Box>
        </Area>

        {/* >>> Create Department Modal */}
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
                  <Container NAME="admin-create" animate={style}>
                    <CreateDepartment />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        {/* >>> Department Modal */}

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
                  <Container NAME="admin-person" animate={style}>
                    <PersonModal />
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

export default withRouter(
  connect(
    state => ({
      data: state.admin.departments.data
    }),
    { getDepartments: getDepartments }
  )(Departments)
);
