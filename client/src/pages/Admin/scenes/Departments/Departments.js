import React, { Component, Fragment } from "react";
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
      onDepartmentModalToggle
    } = this.props;

    return (
      <Fragment>
        <Area name="content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">Departments</Typography>
            </Item>

            <Item margin="wrap-base">
              <Button onClick={onDepartmentFormToggle}>
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
        {isDepartmentFormOpen ? (
          <Container name="department-form">
            <DepartmentForm onDepartmentFormToggle={onDepartmentFormToggle} />
          </Container>
        ) : null}

        {/* >>> Department Modal */}
        {isDepartmentModalOpen ? (
          <Container name="department-modal">
            <DepartmentModal
              onDepartmentModalToggle={onDepartmentModalToggle}
            />
          </Container>
        ) : null}
      </Fragment>
    );
  }
}

export default Departments;
