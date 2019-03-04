import React, { Component, Fragment } from "react";
import format from "date-fns/format";

import { Button, Typography } from "src/components/elements";
import { TextInput, RadioInput, SelectInput } from "src/components/compounds";
import { Item, Box } from "src/layout";
import enums from "src/services/enums";

import roleInputOptions from "./components/roleInputOptions";

const PersonInformation = ({ data }) => {
  return (
    <Fragment>
      <Box margin="stack-l">
        <Item NAME="personInformation-property" margin="inline-s">
          <Typography variant="display-4">Role:</Typography>
        </Item>

        <Item>
          <Typography variant="display-4">{data.role}</Typography>
        </Item>
      </Box>

      {data.role !== enums.roles.ADMINISTRATOR && (
        <Box margin="stack-l">
          <Item NAME="personInformation-property" margin="inline-s">
            <Typography variant="display-4">Group:</Typography>
          </Item>

          <Item>
            <Typography variant="display-4">
              {data.roleData.group ? data.roleData.group.name : "N/A"}
            </Typography>
          </Item>
        </Box>
      )}

      <Item NAME="personInformation-divider" margin="stack-l" />

      <Item margin="stack-l">
        <Typography variant="display-3">Account Information</Typography>
      </Item>

      {[
        {
          property: "Username",
          value: data.username,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Email",
          value: data.email,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Training Duration",
          value: data.roleData.trainingDuration,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Hours Rendered",
          value: data.roleData.hoursRendered,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Date Created",
          value: format(data.dateCreated, "MM-DD-YYYY"),
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Date Last Logged In",
          value:
            data.dateLastLoggedIn &&
            format(data.dateLastLoggedIn, "MM-DD-YYYY"),
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        }
      ]
        .filter(item => item.roles.includes(data.role))
        .map((item, i) => (
          <Box margin="stack-l" key={i}>
            <Item NAME="personInformation-property" margin="inline-s">
              <Typography variant="body">{item.property}:</Typography>
            </Item>

            <Item>
              <Typography variant="body">
                {item.value === "" || item.value === null
                  ? "N/A"
                  : item.value}
              </Typography>
            </Item>
          </Box>
        ))}

      <Item NAME="personInformation-divider" margin="stack-l" />

      <Item margin="stack-l">
        <Typography variant="display-3">Personal Information</Typography>
      </Item>

      {[
        {
          property: "First Name",
          value: data.firstName,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Middle Name",
          value: data.middleName,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Last Name",
          value: data.lastName,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Nickname",
          value: data.nickname,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Gender",
          value: data.gender,
          roles: [
            enums.roles.ADMINISTRATOR,
            enums.roles.SUPERVISOR,
            enums.roles.TRAINEE,
            enums.roles.EMPLOYEE
          ]
        },
        {
          property: "Date of Birth",
          value: data.roleData.dateOfBirth,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Address",
          value: data.roleData.address,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Contact Number",
          value: data.roleData.contactNumber,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "School",
          value: data.roleData.school,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Adviser",
          value: data.roleData.adviserName,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Adviser Contact Number",
          value: data.roleData.adviserContactNumber,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Guardian Name",
          value: data.roleData.guardianName,
          roles: [enums.roles.TRAINEE]
        },
        {
          property: "Guardian Contact Number",
          value: data.roleData.guardianContactNumber,
          roles: [enums.roles.TRAINEE]
        }
      ]
        .filter(item => item.roles.includes(data.role))
        .map((item, i) => (
          <Box margin="stack-l" key={i}>
            <Item NAME="personInformation-property" margin="inline-s">
              <Typography variant="body">{item.property}:</Typography>
            </Item>

            <Item>
              <Typography variant="body">
                {item.value === "" || item.value === null
                  ? "N/A"
                  : item.value}
              </Typography>
            </Item>
          </Box>
        ))}
    </Fragment>
  );
};

class PersonEdit extends Component {
  state = {
    person: {
      role: "",
      group: "",
      accountStatus: "",
      username: "",
      email: "",
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
    return (
      <Fragment>
        <Item margin="stack-l">
          <Typography variant="display-2">Edit Person</Typography>
        </Item>

        <Box margin="stack-base">
          <Item NAME="personEdit-input-name" margin="inline-base">
            <Typography variant="display-3">Role</Typography>
          </Item>

          <Item NAME="personEdit-input">
            <RadioInput
              options={roleInputOptions}
              onChange={this.handleInputChange}
              name="role"
            />
          </Item>
        </Box>

        {/* >>> Role must be filled */}
        {this.state.person.role && (
          <Fragment>
            {/* >>> GROUP */}
            {/* >>> Group is not for administrators */}
            {this.state.person.role !== "administrator" && (
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
                    onChange={this.handleInputChange}
                    name="group"
                    options={[
                      {
                        label: "Choose an option",
                        value: ""
                      },
                      {
                        label: "Alpha",
                        value: "alpha"
                      },
                      {
                        label: "Beta",
                        value: "beta"
                      },
                      {
                        label: "Charlie",
                        value: "charlie"
                      }
                    ]}
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
                  Account Status
                </Typography>
              </Item>

              <Item left NAME="personEdit-input">
                <TextInput type="checkbox" />
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
                role: ["trainee"]
              }
            ]
              .filter(item => item.role.includes(this.state.person.role))
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
                      value={this.state[item.name]}
                      onChange={this.handleInputChange}
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
              .filter(item => item.role.includes(this.state.person.role))
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
                      value={this.state[item.name]}
                      onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                  name="gender"
                  options={[
                    {
                      label: "Choose an option",
                      value: ""
                    },
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
              .filter(item => item.role.includes(this.state.person.role))
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
                      value={this.state[item.name]}
                      onChange={this.handleInputChange}
                    />
                  </Item>
                </Box>
              ))}

            <Item margin="stack-l">
              <Button variant="primary" onClick={this.handleSubmit}>
                Edit Person
              </Button>
            </Item>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

class PersonChangePassword extends Component {
  state = {
    person: {
      password: "",
      confirmPassword: ""
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
    return (
      <Fragment>
        <Item margin="stack-l">
          <Typography variant="display-2">Change Password</Typography>
        </Item>

        {[
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
                value={this.state[item.name]}
                onChange={this.handleInputChange}
              />
            </Item>
          </Box>
        ))}

        <Item margin="stack-l">
          <Button variant="primary" onClick={this.handleSubmit}>
            Change Password
          </Button>
        </Item>
      </Fragment>
    );
  }
}

export { PersonInformation, PersonEdit, PersonChangePassword };
