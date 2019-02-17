import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import { TextInput } from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

const StyledCreateDepartment = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .container-main {
    height: 90%;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-header {
    /* background-color: ${p => p.theme.color.grey.light};
    border-bottom: 1px solid ${p => p.theme.color.dark}; */
    padding-bottom: ${p => p.theme.size.s};
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }

  .area-content {
    display: flex;
  }

  .area-back {
    background-color: ${p => p.theme.color.primary.dark};
    opacity: 0.8;
    height: 10%;
  }

  .container-close {
    position: absolute;
    top: var(--size-base);
    right: var(--size-base);
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

        <Container NAME="main">
          <Area NAME="header" padding="inset-base">
            <Item margin="stack-l">
              <Typography variant="display-1">Create Department</Typography>
            </Item>

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
        </Container>

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