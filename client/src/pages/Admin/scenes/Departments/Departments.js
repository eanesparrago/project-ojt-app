import React, { Component, Fragment } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";
import DepartmentCard from "./components/DepartmentCard";
import DepartmentModal from "./components/DepartmentModal";
import DepartmentForm from "./components/DepartmentForm";

export class Departments extends Component {
  render() {
    const {
      isDepartmentFormOpen,
      isDepartmentModalOpen,
      onDepartmentFormToggle,
      onDepartmentModalToggle,
      match
    } = this.props;

    return (
      <Fragment>
        <Area name="content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">Departments</Typography>
            </Item>

            <Item margin="wrap-base">
              <Button
                onClick={onDepartmentFormToggle}
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

        <Area name="content-body" padding="inset-base">
          <Box wrap>
            <Item margin="wrap-base">
              <DepartmentCard
                onDepartmentModalToggle={onDepartmentModalToggle}
              />
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

        {/* >>> Department Form */}
        {/* {isDepartmentFormOpen ? (
          <Container name="department-form">
            <DepartmentForm onDepartmentFormToggle={onDepartmentFormToggle} />
          </Container>
        ) : null} */}

        <Route
          path={`${match.url}/create-department`}
          render={() => (
            <Container name="department-form">
              <DepartmentForm onDepartmentFormToggle={onDepartmentFormToggle} />
            </Container>
          )}
        />

        {/* >>> Department Modal */}
        <Route
          path={`${match.url}/technical-support-group`}
          render={() => (
            <Container name="department-form">
              <DepartmentModal />
            </Container>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(Departments);
