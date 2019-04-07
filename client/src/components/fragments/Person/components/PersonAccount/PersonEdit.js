import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item, Container } from "src/components/blocks";
import { Button, Typography, Photo, Divider } from "src/components/elements";
import {
  TextInput,
  SelectInput,
  CloudinaryUploadWidget,
  FormGroup
} from "src/components/compounds";

import { deletePerson } from "src/services/session/actions/peopleActionCreators";
import { editPerson } from "src/services/session/actions/personActionCreators";
import { getGroups } from "src/services/session/actions/groupsActionCreators";

class PersonEdit extends Component {
  constructor(props) {
    super(props);

    const {
      person: { data }
    } = props;

    this.state = {
      role: data.role,
      group: data.roleData.group ? data.roleData.group._id : undefined,
      isActive: data.isActive,
      isInitialized: data.roleData.isInitialized,
      username: data.username,
      email: data.email,
      trainingDuration: data.roleData.trainingDuration / 3600,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      nickname: data.nickname,
      gender: data.gender,
      dateOfBirth: data.roleData.dateOfBirth
        ? format(data.roleData.dateOfBirth, "YYYY-MM-DD")
        : "",
      address: data.roleData.address,
      contactNumber: data.roleData.contactNumber,
      school: data.roleData.school,
      adviserName: data.roleData.adviserName,
      adviserContactNumber: data.roleData.adviserContactNumber,
      guardianName: data.roleData.guardianName,
      guardianContactNumber: data.roleData.guardianContactNumber,
      profilePictureUrl: data.profilePictureUrl
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

  handleToggleIsActive = () => {
    this.setState({
      ...this.state,
      isActive: !this.state.isActive
    });
  };

  handleToggleIsInitialized = () => {
    this.setState({
      ...this.state,
      isInitialized: !this.state.isInitialized
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      person: { data },
      editPerson,
      closeForms
    } = this.props;
    const { ...state } = this.state;

    const editData = {
      ...state,
      id: data._id
    };

    editPerson(editData).then(() => {
      closeForms();
    });
  };

  handleDeletePerson = e => {
    e.preventDefault();
    const {
      deletePerson,
      person: { data },
      history
    } = this.props;

    deletePerson(data._id).then(() => {
      history.go(-1);
    });
  };

  render() {
    const {
      groups: { data: groupsData },
      person: { isLoading: personIsLoading },
      errors
    } = this.props;
    const { ...state } = this.state;

    return (
      <Container as="form">
        <Item margin="stack-l">
          <Typography variant="display-3">Edit Person</Typography>
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
                      disabled={personIsLoading}
                      withPlaceholder
                    />
                  </FormGroup.Input>
                </FormGroup>
              </Item>
            )}

            <Item margin="stack-base">
              <FormGroup>
                <FormGroup.Label title="Active" />

                <FormGroup.Input>
                  <TextInput
                    name="isActive"
                    type="checkbox"
                    checked={state.isActive}
                    onChange={this.handleToggleIsActive}
                    disabled={personIsLoading}
                  />
                </FormGroup.Input>
              </FormGroup>
            </Item>

            <Item margin="stack-base">
              <FormGroup>
                <FormGroup.Label title="Initialized" />

                <FormGroup.Input>
                  <TextInput
                    name="isActive"
                    type="checkbox"
                    checked={state.isInitialized}
                    onChange={this.handleToggleIsInitialized}
                    disabled={personIsLoading}
                  />
                </FormGroup.Input>
              </FormGroup>
            </Item>

            <Item margin="stack-base">
              <Divider />
            </Item>

            {/* >>> Account details */}
            <Item margin="stack-base">
              <Typography variant="display-4">Account Information</Typography>
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
                label: "Training Duration (Hours)",
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
                        disabled={personIsLoading}
                        {...item}
                      />
                    </FormGroup.Input>
                  </FormGroup>
                </Item>
              ))}

            <Item margin="stack-base">
              <Divider />
            </Item>

            {/* >>> Personal details */}
            <Item margin="stack-base">
              <Typography variant="display-4">Personal Information</Typography>
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
                        disabled={personIsLoading}
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
                    value={state.gender}
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
                role: ["trainee"]
              },
              {
                label: "Contact Number",
                name: "contactNumber",
                type: "text",
                id: "contact-number-input",
                role: ["trainee"]
              },
              {
                label: "E-mail Address",
                name: "email",
                type: "email",
                id: "email-input",
                role: ["administrator", "supervisor", "trainee", "employee"]
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
                        disabled={personIsLoading}
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
                      <Typography variant="base">No profile picture</Typography>
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
                  <Item>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={this.handleSubmit}
                      disabled={personIsLoading}
                    >
                      Save
                    </Button>
                  </Item>
                </FormGroup.Input>
              </FormGroup>
            </Item>

            <Item margin="stack-l">
              <FormGroup.Label />
              <FormGroup>
                <FormGroup.Input>
                  <Item>
                    <Button
                      variant="secondary"
                      onClick={this.handleDeletePerson}
                      disabled={personIsLoading}
                    >
                      Delete User
                    </Button>
                  </Item>
                </FormGroup.Input>
              </FormGroup>
            </Item>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      groups: state.groups,
      errors: state.errors
    }),
    {
      getGroups: getGroups,
      editPerson: editPerson,
      deletePerson: deletePerson
    }
  )(PersonEdit)
);
