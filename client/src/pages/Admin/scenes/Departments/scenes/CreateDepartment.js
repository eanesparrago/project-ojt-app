import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { TextInput } from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledCreateDepartment = styled.div`
  /* border: 1px solid magenta; */
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-areas:
    "header back"
    "body back";
  grid-template-rows: auto 3fr;
  grid-template-columns: 3fr 1fr;

  .area-createDepartment-header {
    background-color: ${p => p.theme.color.grey.light};
    grid-area: header;
    display: flex;
  }

  .container-close {
    margin-left: auto;
  }

  .area-createDepartment-body {
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-back {
    grid-area: back;
    background-color: ${p => p.theme.color.primary.dark};
    opacity: 0.8;
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }

  .area-content {
    display: flex;
  }

  .item-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreateDepartment extends Component {
  render() {
    const { history } = this.props;

    return (
      <StyledCreateDepartment>
        <Area NAME="createDepartment-header" padding="inset-base">
          <Item>
            <Typography variant="display-1">Create Department</Typography>
          </Item>

          <Container NAME="close">
            <Item>
              <Button
                variant="secondary"
                icon
                rounded
                as={Link}
                to="/admin/departments"
              >
                <i className="fas fa-times" />
              </Button>
            </Item>
          </Container>
        </Area>

        <Area NAME="createDepartment-body" padding="inset-base">
          <Box margin="stack-base">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Department Name</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-base">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Location</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Box margin="stack-l">
            <Item NAME="input-name" left margin="inline-base">
              <Typography>Phone Number</Typography>
            </Item>

            <Item NAME="input">
              <TextInput variant="compact" />
            </Item>
          </Box>

          <Item>
            <Button variant="primary">Create Department</Button>
          </Item>
        </Area>

        <Area
          NAME="back"
          onClick={() => {
            history.push("/admin/departments");
          }}
        />
      </StyledCreateDepartment>
    );
  }
}

export default withRouter(CreateDepartment);
