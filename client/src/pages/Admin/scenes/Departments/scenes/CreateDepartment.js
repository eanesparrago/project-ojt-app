import React, { Component } from "react";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography, Photo } from "src/components/elements";
import { TextInput } from "src/components/compounds";
import { Item, Box, Container, Area } from "src/layout";

import { createDepartment } from "../data/departments/departmentsActionCreators";

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

  .item-createDepartment-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-createDepartment-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreateDepartment extends Component {
  state = {
    name: "",
    location: "",
    phoneNumber: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createDepartment(this.state);
  };

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
              as="form"
            >
              {[
                {
                  label: "Department Name",
                  name: "name",
                  type: "text",
                  id: "department-name-input"
                },
                {
                  label: "Location",
                  name: "location",
                  type: "text",
                  id: "location-input"
                },
                {
                  label: "Phone Number",
                  name: "phoneNumber",
                  type: "text",
                  id: "phone-number-input"
                }
              ].map(item => (
                <Box margin="stack-base" key={item.id}>
                  <Item
                    NAME="createDepartment-input-name"
                    left
                    margin="inline-base"
                  >
                    <Typography variant="base" as="label" htmlFor={item.id}>
                      {item.label}
                    </Typography>
                  </Item>

                  <Item NAME="createDepartment-input">
                    <TextInput
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      value={this.state[item.name]}
                      onChange={this.handleInputChange}
                    />
                  </Item>
                </Box>
              ))}

              <Item>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Create Department
                </Button>
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

export default withRouter(
  connect(
    null,
    {
      createDepartment: createDepartment
    }
  )(CreateDepartment)
);
