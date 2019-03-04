import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import axios from "axios";

import { Button, Typography } from "src/components/elements";
import { TextInput, RadioInput, SelectInput } from "src/components/compounds";
import { Item, Box, Container } from "src/layout";
import { LoadingScene } from "src/components/compounds";
import enums from "src/services/enums";

import roleInputOptions from "./roleInputOptions";

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
        guardianContactNumber: props.data.roleData.guardianContactNumber
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

  handleToggleIsActive = () => {
    this.setState({
      data: { ...this.state.data, isActive: !this.state.data.isActive }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data, fetchPerson } = this.props;
    const { ...state } = this.state;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .put(`/api/users/${data._id}`, state.data)
        .then(res => {
          this.setState({ ...state, isLoading: false }, () => {
            fetchPerson();
          });
        })
        .catch(err => {
          this.setState({
            ...state,
            errors: err.response.data,
            isLoading: false
          });
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
        {/* 
        <Box margin="stack-base">
          <Item NAME="personEdit-input-name" margin="inline-base">
            <Typography variant="display-3">Role</Typography>
          </Item>

          <Item NAME="personEdit-input">
            <RadioInput
              options={roleInputOptions}
              onChange={this.handleInputChange}
              name="role"
              value={data.role}
            />
          </Item>
        </Box> */}

        {/* >>> Role must be filled */}
        {data.role && (
          <Fragment>
            {/* >>> GROUP */}
            {/* >>> Group is not for administrators */}
            {data.role !== "administrator" && (
              <Box margin="stack-base">
                <Item NAME="personEdit-input-name" left margin="inline-base">
                  <Typography
                    variant="display-3"
                    as="label"
                    htmlFor="group-input"
                  >
                    Group
                  </Typography>
                </Item>

                <Item NAME="personEdit-input">
                  <SelectInput
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

            <Box margin="stack-base">
              <Item NAME="personEdit-input-name" left margin="inline-base">
                <Typography
                  variant="display-3"
                  as="label"
                  htmlFor="group-input"
                >
                  Is Active?
                </Typography>
              </Item>

              <Item left NAME="personEdit-input">
                <TextInput
                  name="isActive"
                  type="checkbox"
                  checked={data.isActive}
                  onChange={this.handleToggleIsActive}
                  disabled={isLoading}
                />
              </Item>
            </Box>

            <Item NAME="personEdit-divider" margin="stack-base" />

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
                <Box margin="stack-base" key={item.id}>
                  <Item NAME="personEdit-input-name" left margin="inline-base">
                    <Typography variant="base" as="label" htmlFor={item.id}>
                      {item.label}
                    </Typography>
                  </Item>

                  <Item NAME="personEdit-input">
                    <TextInput
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

            <Item NAME="personEdit-divider" margin="stack-base" />

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
                <Box margin="stack-base" key={item.id}>
                  <Item NAME="personEdit-input-name" left margin="inline-base">
                    <Typography variant="base" as="label" htmlFor={item.id}>
                      {item.label}
                    </Typography>
                  </Item>

                  <Item NAME="personEdit-input">
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
              <Item NAME="personEdit-input-name" left margin="inline-base">
                <Typography variant="base" as="label" htmlFor="gender-input">
                  Gender
                </Typography>
              </Item>

              <Item NAME="personEdit-input">
                <SelectInput
                  id="gender-input"
                  name="gender"
                  value={data.gender}
                  onChange={this.handleInputChange}
                  disabled={isLoading}
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
                <Box margin="stack-base" key={item.id}>
                  <Item NAME="personEdit-input-name" left margin="inline-base">
                    <Typography variant="base" as="label" htmlFor={item.id}>
                      {item.label}
                    </Typography>
                  </Item>

                  <Item NAME="personEdit-input">
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

            <Item margin="stack-l">
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
                disabled={isLoading}
              >
                Edit Person
              </Button>
            </Item>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default PersonEdit;
