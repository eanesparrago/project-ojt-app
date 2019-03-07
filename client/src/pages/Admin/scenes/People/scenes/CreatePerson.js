import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spring } from "react-spring/renderprops";
import { Link, withRouter } from "react-router-dom";

import { Item, Box, Container, Area } from "src/layout";
import { Button, Typography, Photo } from "src/components/elements";
import {
  TextInput,
  RadioInput,
  SelectInput,
  LoadingScene,
  CloudinaryUploadWidget
} from "src/components/compounds";
import axios from "axios";

import roleInputOptions from "./roleInputOptions";

import { getPeople } from "src/pages/Admin/scenes/People/peopleActionCreators";
import { setFlashMessage } from "src/services/session/actions/appActionCreators";

import enums from "src/services/enums";

const StyledCreatePerson = styled.form`
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
    grid-column: 1 / -1;
    background-image: linear-gradient(
      to top right,
      ${p => p.theme.color.primary.dark},
      ${p => p.theme.color.primary.main}
    );
    opacity: 0.8;
    z-index: 99;
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

  .item-createPerson-profilePicture {
    width: ${p => p.theme.incrementFixed(8)};
    height: ${p => p.theme.incrementFixed(8)};
    background-color: ${p => p.theme.color.grey.light};
  }
`;

export class CreatePerson extends Component {
  state = {
    data: {
      role: "",
      group: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      trainingDuration: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      contactNumber: "",
      school: "",
      adviserName: "",
      adviserContactNumber: "",
      guardianName: "",
      guardianContactNumber: "",
      profilePictureUrl: ""
    },
    errors: {},
    groups: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ ...this.state, isLoading: true }, () => {
      axios
        .get("/api/groups?field=name")
        .then(res => {
          this.setState({ ...this.state, groups: res.data, isLoading: false });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            errors: err.response.data,
            isLoading: false
          });
        });
    });
  }

  handleInputChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleProfilePictureUpload = photoUrl => {
    this.setState({
      data: { ...this.state.data, profilePictureUrl: photoUrl }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { ...state } = this.state;
    const { ...props } = this.props;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .post("/api/users/register", state.data)
        .then(res => {
          this.setState({ ...state, data: res.data, isLoading: false }, () => {
            props.getPeople();
            props.history.goBack();
            props.setFlashMessage(
              `${res.data} was created successfully.`,
              "success"
            );
          });
        })
        .catch(err => {
          this.setState(
            {
              ...state,
              errors: err.response.data,
              isLoading: false
            },
            () => {
              props.setFlashMessage("An error occurred", "error");
            }
          );
        });
    });
  };

  render() {
    const { history } = this.props;
    const { isLoading, data, groups, errors } = this.state;

    return (
      <StyledCreatePerson>
        {/* >>> AREA: header */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area
              NAME="createPerson-header"
              padding="inset-base"
              as="header"
              animate={style}
            >
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
          )}
        </Spring>

        {/* >>> AREA: body */}
        <Spring
          delay={100}
          native
          from={{ transform: "translateX(-100%)" }}
          to={{ transform: "translateX(0%)" }}
        >
          {style => (
            <Area NAME="createPerson-body" padding="inset-base" animate={style}>
              {isLoading ? (
                <LoadingScene />
              ) : (
                <Fragment>
                  {/* >>> Role */}
                  <Box margin="stack-base">
                    <Item NAME="createPerson-input-name" margin="inline-base">
                      <Typography variant="display-3">Role</Typography>
                    </Item>

                    <Item NAME="createPerson-input">
                      <RadioInput
                        options={roleInputOptions}
                        onChange={this.handleInputChange}
                        name="role"
                        value={data.role}
                      />
                    </Item>
                  </Box>

                  {/* >>> Role must be filled */}
                  {data.role && (
                    <Fragment>
                      {/* >>> GROUP */}
                      {/* >>> Group is not for administrators */}
                      {data.role !== "administrator" && (
                        <Box margin="stack-base">
                          <Item
                            NAME="createPerson-input-name"
                            left
                            margin="inline-base"
                          >
                            <Typography
                              variant="display-3"
                              as="label"
                              htmlFor="group-input"
                            >
                              Group
                            </Typography>
                          </Item>

                          <Item NAME="createPerson-input">
                            <SelectInput
                              autoFocus
                              id="group-input"
                              value={data.group}
                              onChange={this.handleInputChange}
                              name="group"
                              options={groups.map(group => ({
                                label: group.name,
                                value: group._id
                              }))}
                              error={errors.group}
                              disabled={isLoading}
                            />
                          </Item>
                        </Box>
                      )}

                      <Item NAME="createPerson-divider" margin="stack-base" />

                      {/* >>> Account details */}
                      <Item margin="stack-base">
                        <Typography variant="display-3">
                          Account Information
                        </Typography>
                      </Item>

                      {[
                        {
                          label: "Username",
                          name: "username",
                          type: "text",
                          id: "username-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ],
                          autoFocus: data.role === enums.roles.ADMINISTRATOR
                        },
                        {
                          label: "Password",
                          name: "password",
                          type: "password",
                          id: "password-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "Confirm Password",
                          name: "confirmPassword",
                          type: "password",
                          id: "confirm-password-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "Training Duration",
                          name: "trainingDuration",
                          type: "number",
                          id: "training-duration-input",
                          role: ["trainee"],
                          min: "1",
                          max: "999"
                        }
                      ]
                        .filter(item => item.role.includes(data.role))
                        .map(item => (
                          <Box margin="stack-base" key={item.id}>
                            <Item
                              NAME="createPerson-input-name"
                              left
                              margin="inline-base"
                            >
                              <Typography
                                variant="base"
                                as="label"
                                htmlFor={item.id}
                              >
                                {item.label}
                              </Typography>
                            </Item>

                            <Item NAME="createPerson-input">
                              <TextInput
                                autoFocus={item.autoFocus}
                                name={item.name}
                                id={item.id}
                                type={item.type}
                                value={data[item.name]}
                                onChange={this.handleInputChange}
                                error={errors[item.name]}
                                disabled={isLoading}
                                {...item}
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
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "Middle Name",
                          name: "middleName",
                          type: "text",
                          id: "middle-name-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "Last Name",
                          name: "lastName",
                          type: "text",
                          id: "last-name-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "Nickname",
                          name: "nickname",
                          type: "text",
                          id: "nickname-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        }
                      ]
                        .filter(item => item.role.includes(data.role))
                        .map(item => (
                          <Box margin="stack-base" key={item.id}>
                            <Item
                              NAME="createPerson-input-name"
                              left
                              margin="inline-base"
                            >
                              <Typography
                                variant="base"
                                as="label"
                                htmlFor={item.id}
                              >
                                {item.label}
                              </Typography>
                            </Item>

                            <Item NAME="createPerson-input">
                              <TextInput
                                name={item.name}
                                id={item.id}
                                type={item.type}
                                value={data[item.name]}
                                onChange={this.handleInputChange}
                                error={errors[item.name]}
                                disabled={isLoading}
                              />
                            </Item>
                          </Box>
                        ))}

                      <Box margin="stack-base">
                        <Item
                          NAME="createPerson-input-name"
                          left
                          margin="inline-base"
                        >
                          <Typography
                            variant="base"
                            as="label"
                            htmlFor="gender-input"
                          >
                            Gender
                          </Typography>
                        </Item>

                        <Item NAME="createPerson-input">
                          <SelectInput
                            id="gender-input"
                            onChange={this.handleInputChange}
                            name="gender"
                            options={[
                              {
                                label: "Male",
                                value: "male"
                              },
                              {
                                label: "Female",
                                value: "female"
                              }
                            ]}
                          />
                        </Item>
                      </Box>

                      {[
                        {
                          label: "Date of Birth",
                          name: "dateOfBirth",
                          type: "date",
                          id: "date-of-birth-input",
                          role: ["trainee"]
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
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },
                        {
                          label: "E-mail Address",
                          name: "email",
                          type: "email",
                          id: "email-input",
                          role: [
                            "administrator",
                            "supervisor",
                            "trainee",
                            "employee"
                          ]
                        },

                        {
                          label: "School",
                          name: "school",
                          type: "text",
                          id: "school-input",
                          role: ["trainee"]
                        },
                        {
                          label: "Adviser Name",
                          name: "adviserName",
                          type: "text",
                          id: "adviser-name-input",
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
                        .filter(item => item.role.includes(data.role))
                        .map(item => (
                          <Box margin="stack-base" key={item.id}>
                            <Item
                              NAME="createPerson-input-name"
                              left
                              margin="inline-base"
                            >
                              <Typography
                                variant="base"
                                as="label"
                                htmlFor={item.id}
                              >
                                {item.label}
                              </Typography>
                            </Item>

                            <Item NAME="createPerson-input">
                              <TextInput
                                name={item.name}
                                id={item.id}
                                type={item.type}
                                value={data[item.name]}
                                onChange={this.handleInputChange}
                                error={errors[item.name]}
                                disabled={isLoading}
                              />
                            </Item>
                          </Box>
                        ))}

                      <Box margin="stack-base">
                        <Item
                          NAME="createPerson-input-name"
                          left
                          margin="inline-base"
                        >
                          <Typography variant="base">
                            Profile Picture
                          </Typography>
                        </Item>

                        <Box NAME="createPerson-input" row>
                          <Item
                            NAME="createPerson-profilePicture"
                            margin="inline-m"
                            center
                          >
                            {data.profilePictureUrl === "" ? (
                              <Typography variant="base">
                                No profile picture
                              </Typography>
                            ) : (
                              <Photo>
                                <img src={data.profilePictureUrl} alt="" />
                              </Photo>
                            )}
                          </Item>

                          <Item>
                            <CloudinaryUploadWidget
                              handleProfilePictureUpload={
                                this.handleProfilePictureUpload
                              }
                            />
                          </Item>
                        </Box>
                      </Box>

                      <Item margin="stack-l">
                        <Button
                          type="submit"
                          variant="primary"
                          onClick={this.handleSubmit}
                          disabled={isLoading}
                        >
                          Create Person
                        </Button>
                      </Item>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Area>
          )}
        </Spring>

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

export default withRouter(
  connect(
    null,
    { getPeople: getPeople, setFlashMessage: setFlashMessage }
  )(CreatePerson)
);
