import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Button, Typography, Photo } from "../../../../../components/elements";
import {
  TextInput,
  RadioInput,
  SelectInput
} from "../../../../../components/compounds";
import { Item, Box, Container, Area } from "../../../../../layout";

import roleInputOptions from "./roleInputOptions";

const StyledCreatePerson = styled.div`
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

  .area-createPerson-header {
    grid-area: header;
    background-color: ${p => p.theme.color.grey.light};
    display: flex;
  }

  .container-createPerson-close {
    margin-left: auto;
  }

  .area-createPerson-body {
    /* border: 1px solid magenta; */
    grid-area: body;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
  }

  .area-createPerson-back {
    grid-area: back;
    background-image: linear-gradient(
      to top right,
      ${p => p.theme.color.primary.dark},
      ${p => p.theme.color.primary.main}
    );
    opacity: 0.8;
  }

  .item-createPerson-divider {
    width: 100%;
    height: var(--size-xxs);
    background-color: ${p => p.theme.color.primary.light};
  }

  .item-createPerson-input-name {
    width: ${p => p.theme.incrementFixed(6)};
  }

  .item-createPerson-input {
    width: ${p => p.theme.incrementFixed(16)};
  }
`;

export class CreatePerson extends Component {
  state = {
    person: {
      role: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      requiredHours: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      address: "",
      contactNumber: "",
      dateOfBirth: "",
      school: "",
      adviser: "",
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
    const { history } = this.props;

    return (
      <StyledCreatePerson>
        {/* >>> AREA: header */}
        <Area NAME="createPerson-header" padding="inset-base" as="header">
          <Item>
            <Typography variant="display-1" as="h1">
              Create Person
            </Typography>
          </Item>

          <Container NAME="createPerson-close">
            <Item>
              <Button
                variant="secondary"
                icon
                rounded
                as={Link}
                to="/admin/people"
              >
                <i className="fas fa-times" />
              </Button>
            </Item>
          </Container>
        </Area>

        {/* >>> AREA: body */}
        <Area NAME="createPerson-body" padding="inset-base">
          {/* >>> Role */}
          <Box margin="stack-base">
            <Item NAME="createPerson-input-name" margin="inline-base">
              <Typography variant="display-3">Role</Typography>
            </Item>

            <Item NAME="createPerson-input">
              <RadioInput
                options={roleInputOptions}
                onChange={this.handleInputChange}
              />
            </Item>
          </Box>

          {/* >>> Role must be filled */}
          {this.state.person.role && (
            <Fragment>
              {/* >>> DEPARTMENT */}
              {/* >>> Department is not for administrator */}
              {this.state.person.role !== "administrator" && (
                <Box margin="stack-base">
                  <Item
                    NAME="createPerson-input-name"
                    left
                    margin="inline-base"
                  >
                    <Typography
                      variant="display-3"
                      as="label"
                      htmlFor="department-input"
                    >
                      Department
                    </Typography>
                  </Item>

                  <Item NAME="createPerson-input">
                    <SelectInput
                      id="department-input"
                      onChange={this.handleInputChange}
                    />
                  </Item>
                </Box>
              )}

              <Item NAME="createPerson-divider" margin="stack-base" />

              {/* >>> Account details */}
              <Item margin="stack-base">
                <Typography variant="display-3">Account Information</Typography>
              </Item>

              {[
                {
                  label: "Username",
                  name: "username",
                  type: "text",
                  id: "username-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  id: "password-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                  id: "confirm-password-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Required Hours",
                  name: "requiredHours",
                  type: "number",
                  id: "required-hours-input",
                  role: ["trainee"]
                }
              ]
                .filter(item => item.role.includes(this.state.person.role))
                .map(item => (
                  <Box margin="stack-base" key={item.id}>
                    <Item
                      NAME="createPerson-input-name"
                      left
                      margin="inline-base"
                    >
                      <Typography variant="base" as="label" htmlFor={item.id}>
                        {item.label}
                      </Typography>
                    </Item>

                    <Item NAME="createPerson-input">
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

              <Item NAME="createPerson-divider" margin="stack-base" />

              {/* >>> Personal details */}
              <Item margin="stack-base">
                <Typography variant="display-3">
                  Personal Information &mdash; Optional
                </Typography>
              </Item>

              {[
                {
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  id: "first-name-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Middle Name",
                  name: "middleName",
                  type: "text",
                  id: "middle-name-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  id: "last-name-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Nickname",
                  name: "nickname",
                  type: "text",
                  id: "nickname-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Address",
                  name: "address",
                  type: "text",
                  id: "address-input",
                  role: ["trainee"]
                },
                {
                  label: "Contact Number",
                  name: "contactNumber",
                  type: "text",
                  id: "contact-number-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "E-mail Address",
                  name: "email",
                  type: "email",
                  id: "email-input",
                  role: ["administrator", "supervisor", "trainee", "employee"]
                },
                {
                  label: "Date of Birth",
                  name: "dateOfBirth",
                  type: "date",
                  id: "date-of-birth-input",
                  role: ["trainee"]
                },
                {
                  label: "School",
                  name: "school",
                  type: "text",
                  id: "school-input",
                  role: ["trainee"]
                },
                {
                  label: "Adviser",
                  name: "adviser",
                  type: "text",
                  id: "adviser-input",
                  role: ["trainee"]
                },
                {
                  label: "Adviser Contact Number",
                  name: "adviserContactNumber",
                  type: "text",
                  id: "adviser-contact-number-input",
                  role: ["trainee"]
                },
                {
                  label: "Guardian Name",
                  name: "guardianName",
                  type: "text",
                  id: "guardian-name-input",
                  role: ["trainee"]
                },
                {
                  label: "Guardian Contact Number",
                  name: "guardianContactNumber",
                  type: "text",
                  id: "guardian-contact-number-input",
                  role: ["trainee"]
                }
              ]
                .filter(item => item.role.includes(this.state.person.role))
                .map(item => (
                  <Box margin="stack-base" key={item.id}>
                    <Item
                      NAME="createPerson-input-name"
                      left
                      margin="inline-base"
                    >
                      <Typography variant="base" as="label" htmlFor={item.id}>
                        {item.label}
                      </Typography>
                    </Item>

                    <Item NAME="createPerson-input">
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

              <Item margin="stack-l">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Create Person
                </Button>
              </Item>
            </Fragment>
          )}
        </Area>

        <Area
          NAME="createPerson-back"
          onClick={() => {
            history.push("/admin/people");
          }}
        />
      </StyledCreatePerson>
    );
  }
}

export default withRouter(CreatePerson);
