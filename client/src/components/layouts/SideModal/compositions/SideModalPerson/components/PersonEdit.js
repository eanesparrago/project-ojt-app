import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item, Container } from "src/components/blocks";
import { Button, Typography, Photo, Divider } from "src/components/elements";
import {
  TextInput,
  SelectInput,
  LoadingScene,
  CloudinaryUploadWidget,
  FormGroup
} from "src/components/compounds";

import { setFlashMessage } from "src/services/session/actions/appActionCreators";
import { getPeople } from "src/services/session/actions/peopleActionCreators";
import { getGroups } from "src/services/session/actions/groupsActionCreators";

class PersonEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        role: props.data.role,
        group: props.data.roleData.group
          ? props.data.roleData.group._id
          : undefined,
        isActive: props.data.isActive,
        username: props.data.username,
        email: props.data.email,
        trainingDuration: props.data.roleData.trainingDuration,
        firstName: props.data.firstName,
        middleName: props.data.middleName,
        lastName: props.data.lastName,
        nickname: props.data.nickname,
        gender: props.data.gender,
        dateOfBirth: props.data.roleData.dateOfBirth
          ? format(props.data.roleData.dateOfBirth, "YYYY-MM-DD")
          : "",
        address: props.data.roleData.address,
        contactNumber: props.data.roleData.contactNumber,
        school: props.data.roleData.school,
        adviserName: props.data.roleData.adviserName,
        adviserContactNumber: props.data.roleData.adviserContactNumber,
        guardianName: props.data.roleData.guardianName,
        guardianContactNumber: props.data.roleData.guardianContactNumber,
        profilePictureUrl: props.data.profilePictureUrl
      },
      isLoading: false,
      errors: {},
      groups: []
    };
  }

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

  handleToggleIsActive = () => {
    this.setState({
      data: { ...this.state.data, isActive: !this.state.data.isActive }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      data,
      fetchPerson,
      setFlashMessage,
      getPeople,
      getGroups,
      match
    } = this.props;
    const { ...state } = this.state;

    console.log(match);

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .put(`/api/users/${data._id}`, state.data)
        .then(res => {
          this.setState({ ...state, isLoading: false }, () => {
            fetchPerson();
            getPeople();
            getGroups();
            setFlashMessage(`${res.data} was successfully edited.`, "success");
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
              setFlashMessage(`An error occurred.`, "error");
            }
          );
        });
    });
  };

  handleDeletePerson = e => {
    e.preventDefault();
    const { ...state } = this.state;
    const { getPeople, setFlashMessage, data, history, getGroups } = this.props;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .delete(`/api/users/${data._id}`)
        .then(res => {
          getPeople();
          getGroups();
          setFlashMessage(`${res.data} was successfully deleted.`, "success");
          history.go(-1);
        })
        .catch(err => {
          this.setState(
            {
              ...state,
              errors: err.response.data,
              isLoading: false
            },
            () => {
              setFlashMessage(`An error occurred.`, "error");
            }
          );
        });
    });
  };

  render() {
    const { data, errors, isLoading, groups } = this.state;

    return isLoading ? (
      <LoadingScene />
    ) : (
      <Container as="form">
        <Item margin="stack-l">
          <Typography variant="display-2">Edit Person</Typography>
        </Item>

        {/* >>> Role must be filled */}
        {data.role && (
          <Fragment>
            {/* >>> GROUP */}
            {/* >>> Group is not for administrators */}
            {data.role !== "administrator" && (
              <Item margin="stack-base">
                <FormGroup>
                  <FormGroup.Label title="Group" htmlFor="group-input" />

                  <FormGroup.Input>
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
                  </FormGroup.Input>
                </FormGroup>
              </Item>
            )}

            <Item margin="stack-base">
              <FormGroup>
                <FormGroup.Label title="Is Active?" />

                <FormGroup.Input>
                  <TextInput
                    name="isActive"
                    type="checkbox"
                    checked={data.isActive}
                    onChange={this.handleToggleIsActive}
                    disabled={isLoading}
                  />
                </FormGroup.Input>
              </FormGroup>
            </Item>

            <Item margin="stack-base">
              <Divider />
            </Item>

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
                <Item margin="stack-base" key={item.id}>
                  <FormGroup>
                    <FormGroup.Label title={item.label} htmlFor={item.id} />

                    <FormGroup.Input>
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
                    </FormGroup.Input>
                  </FormGroup>
                </Item>
              ))}

            <Item margin="stack-base">
              <Divider />
            </Item>

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
              }
            ]
              .filter(item => item.role.includes(data.role))
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
                        value={data[item.name]}
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
                <FormGroup.Label title="Gender" htmlFor="gender-input" />

                <FormGroup.Input>
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
              .filter(item => item.role.includes(data.role))
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
                        value={data[item.name]}
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
                    {data.profilePictureUrl === "" ? (
                      <Typography variant="base">No profile picture</Typography>
                    ) : (
                      <Photo>
                        <img src={data.profilePictureUrl} alt="" />
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
                      disabled={isLoading}
                    >
                      Edit {data.username}
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
                      disabled={isLoading}
                    >
                      Delete {data.username}
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
    null,
    {
      setFlashMessage: setFlashMessage,
      getPeople: getPeople,
      getGroups: getGroups
    }
  )(PersonEdit)
);
