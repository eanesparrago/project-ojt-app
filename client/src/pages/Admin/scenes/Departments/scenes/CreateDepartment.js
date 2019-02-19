import React, { Component } from "react";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
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

  > * {
    z-index: 100;
  }

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
    grid-column: 1 / -1;
    background-image: linear-gradient(
      to top right,
      ${p => p.theme.color.primary.dark},
      ${p => p.theme.color.primary.main}
    );
    opacity: 0.8;
    z-index: 99;
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
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createDepartment-header"
              padding="inset-base"
              animate={style}
            >
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
          )}
        </Spring>

        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createDepartment-body"
              padding="inset-base"
              animate={style}
            >
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
          )}
        </Spring>

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
