import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button, Typography, Photo, Divider } from "src/components/elements";
import {
  TextInput,
  RadioInput,
  SelectInput,
  FormGroup,
  CloudinaryUploadWidget
} from "src/components/compounds";
import { SideModal } from "src/components/layouts";

import { createPerson } from "src/services/session/actions/personActionCreators";
import { getGroups } from "src/services/session/actions/groupsActionCreators";
import enums from "src/services/enums";

export class SideModalCreatePerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: props.location.state ? props.location.state.role : "",
      group: props.location.state ? props.location.state.group : "",
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
    };
  }

  componentDidMount() {
    const { getGroups } = this.props;

    getGroups();
  }

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleProfilePictureUpload = photoUrl => {
    this.setState({
      ...this.state,
      profilePictureUrl: photoUrl
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { createPerson, history } = this.props;
    const { ...state } = this.state;

    createPerson(state).then(() => {
      history.goBack();
    });
  };

  render() {
    const {
      person: { isLoading, errors },
      groups: { data: groupsData, isLoading: groupsIsLoading }
    } = this.props;
    const { ...state } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Create Person" />

        <SideModal.Body isLoading={isLoading || groupsIsLoading}>
          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label title="Role" />

              <FormGroup.Input>
                <RadioInput
                  options={[
                    {
                      id: "role-administrator",
                      value: "administrator",
                      label: "Administrator"
                    },
                    {
                      id: "role-supervisor",
                      value: "supervisor",
                      label: "Supervisor"
                    },
                    {
                      id: "role-trainee",
                      value: "trainee",
                      label: "Trainee"
                    },
                    {
                      id: "role-employee",
                      value: "employee",
                      label: "Employee"
                    }
                  ]}
                  onChange={this.handleInputChange}
                  name="role"
                  value={state.role}
                />
              </FormGroup.Input>
            </FormGroup>
          </Item>

          {/* >>> Role must be filled */}
          {state.role && (
            <Fragment>
              {/* >>> GROUP */}
              {/* >>> Group is not for administrators */}
              {state.role !== "administrator" && (
                <Item margin="stack-base">
                  <FormGroup>
                    <FormGroup.Label title="Group" htmlFor="group-input" />

                    <FormGroup.Input>
                      <SelectInput
                        autoFocus
                        id="group-input"
                        value={state.group}
                        onChange={this.handleInputChange}
                        name="group"
                        options={groupsData.map(group => ({
                          label: group.name,
                          value: group._id
                        }))}
                        error={errors.group}
                        disabled={isLoading}
                        withPlaceholder
                      />
                    </FormGroup.Input>
                  </FormGroup>
                </Item>
              )}

              <Item margin="stack-base">
                <Divider />
              </Item>

              {/* >>> Account Information */}
              <Item margin="stack-base">
                <Typography variant="display-3">Account Information</Typography>
              </Item>

              {[
                {
                  label: "Username",
                  name: "username",
                  type: "text",
                  id: "username-input",
                  role: ["administrator", "supervisor", "trainee", "employee"],
                  autoFocus: state.role === enums.roles.ADMINISTRATOR,
                  maxLength: "50"
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
                  label: "Training Duration",
                  name: "trainingDuration",
                  type: "number",
                  id: "training-duration-input",
                  role: ["trainee"],
                  min: "1",
                  max: "999"
                }
              ]
                .filter(item => item.role.includes(state.role))
                .map(item => (
                  <Item margin="stack-base" key={item.id}>
                    <FormGroup>
                      <FormGroup.Label title={item.label} htmlFor={item.id} />

                      <FormGroup.Input>
                        <TextInput
                          autoFocus={item.autoFocus}
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          value={state[item.name]}
                          onChange={this.handleInputChange}
                          error={errors[item.name]}
                          disabled={isLoading}
                          {...item}
                        />
                      </FormGroup.Input>
                    </FormGroup>
                  </Item>
                ))}

              <Item margin="stack-base">
                <Divider />
              </Item>

              {/* >>> Personal Information */}
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
                }
              ]
                .filter(item => item.role.includes(state.role))
                .map(item => (
                  <Item margin="stack-base" key={item.id}>
                    <FormGroup>
                      <FormGroup.Label title={item.label} htmlFor={item.id} />

                      <FormGroup.Input>
                        <TextInput
                          autoFocus={item.autoFocus}
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          value={state[item.name]}
                          onChange={this.handleInputChange}
                          error={errors[item.name]}
                          disabled={isLoading}
                          maxLength="50"
                          {...item}
                        />
                      </FormGroup.Input>
                    </FormGroup>
                  </Item>
                ))}

              <Item margin="stack-base">
                <FormGroup>
                  <FormGroup.Label title="Gender" htmlFor="gender-input" />

                  <FormGroup.Input>
                    <SelectInput
                      id="gender-input"
                      onChange={this.handleInputChange}
                      name="gender"
                      withPlaceholder
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
                  </FormGroup.Input>
                </FormGroup>
              </Item>

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
                  role: ["trainee"],
                  maxLength: "100"
                },
                {
                  label: "Contact Number",
                  name: "contactNumber",
                  type: "text",
                  id: "contact-number-input",
                  role: ["trainee"],
                  maxLength: "50"
                },
                {
                  label: "E-mail Address",
                  name: "email",
                  type: "email",
                  id: "email-input",
                  role: ["administrator", "supervisor", "trainee", "employee"],
                  maxLength: "100"
                },

                {
                  label: "School",
                  name: "school",
                  type: "text",
                  id: "school-input",
                  role: ["trainee"],
                  maxLength: "50"
                },
                {
                  label: "Adviser Name",
                  name: "adviserName",
                  type: "text",
                  id: "adviser-name-input",
                  role: ["trainee"],
                  maxLength: "50"
                },
                {
                  label: "Adviser Contact Number",
                  name: "adviserContactNumber",
                  type: "text",
                  id: "adviser-contact-number-input",
                  role: ["trainee"],
                  maxLength: "50"
                },
                {
                  label: "Guardian Name",
                  name: "guardianName",
                  type: "text",
                  id: "guardian-name-input",
                  role: ["trainee"],
                  maxLength: "50"
                },
                {
                  label: "Guardian Contact Number",
                  name: "guardianContactNumber",
                  type: "text",
                  id: "guardian-contact-number-input",
                  role: ["trainee"],
                  maxLength: "50"
                }
              ]
                .filter(item => item.role.includes(state.role))
                .map(item => (
                  <Item margin="stack-base" key={item.id}>
                    <FormGroup>
                      <FormGroup.Label title={item.label} htmlFor={item.id} />

                      <FormGroup.Input>
                        <TextInput
                          autoFocus={item.autoFocus}
                          name={item.name}
                          id={item.id}
                          type={item.type}
                          value={state[item.name]}
                          onChange={this.handleInputChange}
                          error={errors[item.name]}
                          disabled={isLoading}
                          {...item}
                        />
                      </FormGroup.Input>
                    </FormGroup>
                  </Item>
                ))}

              <Item margin="stack-base">
                <FormGroup>
                  <FormGroup.Label title="Profile Picture" />

                  <FormGroup.Input>
                    <Item margin="stack-base">
                      <CloudinaryUploadWidget
                        handleProfilePictureUpload={
                          this.handleProfilePictureUpload
                        }
                      />
                    </Item>

                    <Item>
                      {state.profilePictureUrl === "" ? (
                        <Typography variant="base">
                          No profile picture
                        </Typography>
                      ) : (
                        <Photo>
                          <img src={state.profilePictureUrl} alt="" />
                        </Photo>
                      )}
                    </Item>
                  </FormGroup.Input>
                </FormGroup>
              </Item>

              <Item margin="stack-l">
                <FormGroup.Label />
                <FormGroup>
                  <FormGroup.Input>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={this.handleSubmit}
                      disabled={isLoading}
                    >
                      Submit
                    </Button>
                  </FormGroup.Input>
                </FormGroup>
              </Item>
            </Fragment>
          )}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      person: state.person,
      groups: state.groups
    }),
    {
      createPerson: createPerson,
      getGroups: getGroups
    }
  )(SideModalCreatePerson)
);
