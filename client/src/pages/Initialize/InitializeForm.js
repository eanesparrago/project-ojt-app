import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Spring, animated } from "react-spring/renderprops";
import axios from "axios";
import format from "date-fns/format";

import { Item } from "src/components/blocks";
import { Typography, Button, Photo } from "src/components/elements";
import {
  FormGroup,
  TextInput,
  SelectInput,
  CloudinaryUploadWidget
} from "src/components/compounds";

import { logoutUser } from "src/services/session/actions/authActionCreators";
import { setFlashMessage } from "src/services/session/actions/appActionCreators";

const StyledInitializeForm = animated(styled.form``);

export class InitializeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        firstName: props.data.firstName,
        middleName: props.data.middleName,
        lastName: props.data.lastName,
        nickname: props.data.nickname,
        gender: props.data.gender,
        email: props.data.email,
        profilePictureUrl: props.data.profilePictureUrl,
        school: props.data.roleData.school,
        dateOfBirth: props.data.roleData.dateOfBirth
          ? format(props.data.roleData.dateOfBirth, "YYYY-MM-DD")
          : "",
        address: props.data.roleData.address,
        contactNumber: props.data.roleData.contactNumber,
        adviserName: props.data.roleData.adviserName,
        adviserContactNumber: props.data.adviserContactNumber,
        guardianName: props.data.roleData.guardianName,
        guardianContactNumber: props.data.roleData.guardianContactNumber
      },
      isLoading: false,
      errors: {}
    };
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
    const { logoutUser, history, ...props } = this.props;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .post("/api/trainee/initialize", state.data)
        .then(res => {
          this.setState({ ...state, data: res.data, isLoading: false }, () => {
            logoutUser();
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
    const { data, isLoading, errors } = this.state;

    return (
      <Spring
        native
        from={{ transform: "translateY(10rem)", opacity: "0" }}
        to={{ transform: "translateY(0)", opacity: "1" }}
      >
        {style => (
          <StyledInitializeForm style={style}>
            {[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                id: "first-name-input",
                autoFocus: true
              },
              {
                label: "Middle Name",
                name: "middleName",
                type: "text",
                id: "middle-name-input"
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                id: "last-name-input"
              },
              {
                label: "Nickname",
                name: "nickname",
                type: "text",
                id: "nickname-input"
              }
            ].map(item => (
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
                    value={data.gender}
                    error={errors.gender}
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
                id: "date-of-birth-input"
              },
              {
                label: "Address",
                name: "address",
                type: "text",
                id: "address-input"
              },
              {
                label: "Contact Number",
                name: "contactNumber",
                type: "text",
                id: "contact-number-input"
              },
              {
                label: "E-mail Address",
                name: "email",
                type: "email",
                id: "email-input"
              },

              {
                label: "School",
                name: "school",
                type: "text",
                id: "school-input"
              },
              {
                label: "Adviser Name",
                name: "adviserName",
                type: "text",
                id: "adviser-name-input"
              },
              {
                label: "Adviser Contact Number",
                name: "adviserContactNumber",
                type: "text",
                id: "adviser-contact-number-input"
              },
              {
                label: "Guardian Name",
                name: "guardianName",
                type: "text",
                id: "guardian-name-input"
              },
              {
                label: "Guardian Contact Number",
                name: "guardianContactNumber",
                type: "text",
                id: "guardian-contact-number-input"
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                id: "password-input"
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                id: "confirm-password-input"
              }
            ].map(item => (
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
              <FormGroup>
                <FormGroup.Label />

                <FormGroup.Input>
                  <Button
                    variant="primary"
                    type="submit"
                    full
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                </FormGroup.Input>
              </FormGroup>
            </Item>
          </StyledInitializeForm>
        )}
      </Spring>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      auth: state.auth
    }),
    {
      setFlashMessage: setFlashMessage,
      logoutUser: logoutUser
    }
  )(InitializeForm)
);
