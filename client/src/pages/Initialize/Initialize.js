import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { Item } from "src/components/blocks";
import { Typography, Button, Photo } from "src/components/elements";
import {
  FormGroup,
  TextInput,
  SelectInput,
  CloudinaryUploadWidget
} from "src/components/compounds";

import { setFlashMessage } from "src/services/session/actions/appActionCreators";
import { logoutUser } from "src/services/session/actions/authActionCreators";

const StyledInitialize = styled.form`
  min-height: 100%;
  padding: var(--size-xl);
  background-color: ${p => p.theme.color.white};
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export class Initialize extends Component {
  state = {
    data: {
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      gender: "",
      email: "",
      profilePictureUrl: "",
      school: "",
      dateOfBirth: "",
      address: "",
      contactNumber: "",
      adviserName: "",
      adviserContactNumber: "",
      guardianName: "",
      guardianContactNumber: ""
    },
    isLoading: false,
    errors: {}
  };

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
    const {
      auth: { user }
    } = this.props;

    const { data, isLoading, errors } = this.state;

    return (
      <StyledInitialize>
        <Item margin="stack-l">
          <Typography variant="display-1">Hello.</Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="body">
            Your username is {user.username}.
          </Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="base">
            Please complete the form below to initialize your user account.
          </Typography>
        </Item>

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
                error={errors.gender}
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
                  handleProfilePictureUpload={this.handleProfilePictureUpload}
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

        <Item>
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
      </StyledInitialize>
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
  )(Initialize)
);
