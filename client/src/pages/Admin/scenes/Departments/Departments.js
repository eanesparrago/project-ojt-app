import React, { Component } from "react";
import styled from "styled-components";
import { Route, withRouter, Link } from "react-router-dom";
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
  max-height: 100%;

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
  render() {
    const { match } = this.props;

    return (
      <StyledDepartments>
        <Area name="departments-content-header" padding="inset-base">
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

        <Area name="departments-content-body" padding="inset-base">
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

        <Route
          path={`${match.url}/create-department`}
          render={() => (
            <Container name="departments-create-department">
              <CreateDepartment />
            </Container>
          )}
        />

        {/* >>> Department Modal */}
        <Route
          path={`${match.url}/technical-support-group`}
          render={() => (
            <Container name="departments-department">
              <Department />
            </Container>
          )}
        />
      </StyledDepartments>
    );
  }
}

export default withRouter(Departments);
