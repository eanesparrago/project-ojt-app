import React, { Component, Fragment } from "react";
import { Button, Typography } from "../../../../../components/elements";
import {
  TextInput,
  RadioInput,
  SelectInput
} from "../../../../../components/compounds";
import { Item, Box } from "../../../../../layout";

import roleInputOptions from "./roleInputOptions";

const PersonInformation = () => {
  return (
    <Fragment>
      <Item margin="stack-l">
        <Typography variant="display-2">Person Information</Typography>
      </Item>

      <Box margin="stack-l">
        <Item NAME="personInformation-property" margin="inline-s">
          <Typography variant="display-4">Role:</Typography>
        </Item>

        <Item>
          <Typography variant="display-4">Trainee</Typography>
        </Item>
      </Box>

      <Box margin="stack-l">
        <Item NAME="personInformation-property" margin="inline-s">
          <Typography variant="display-4">Department:</Typography>
        </Item>

        <Item>
          <Typography variant="display-4">Technical Support Group</Typography>
        </Item>
      </Box>

      <Item NAME="personInformation-divider" margin="stack-l" />

      <Item margin="stack-l">
        <Typography variant="display-3">Account Information</Typography>
      </Item>

      {[
        {
          property: "Username",
          value: "usteven"
        },
        {
          property: "Email",
          value: "stevenuniverse@example.com"
        },
        {
          property: "Required Hours",
          value: "486"
        },
        {
          property: "Remaining Hours",
          value: "30"
        }
      ].map(item => (
        <Box margin="stack-l">
          <Item NAME="personInformation-property" margin="inline-s">
            <Typography variant="body">{item.property}:</Typography>
          </Item>

          <Item>
            <Typography variant="body">{item.value}</Typography>
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
          value: "Steven"
        },
        {
          property: "Middle Name",
          value: "Quartz"
        },
        {
          property: "Last Name",
          value: "Universe"
        },
        {
          property: "Nickname",
          value: "Steven"
        },
        {
          property: "Address",
          value: "8514 Hall Drive, Egg Harbor Township, NJ 08234"
        },
        {
          property: "Contact Number",
          value: "01234567890"
        },
        {
          property: "Date of Birth",
          value: "February 20, 2019 "
        },
        {
          property: "School",
          value: "AMA Computer College — Parañaque Campus"
        },
        {
          property: "Adviser",
          value: "Steven Universe"
        },
        {
          property: "Adviser Contact Number",
          value: "01234567890"
        },
        {
          property: "Guardian Name",
          value: "Steven Universe"
        },
        {
          property: "Guardian Contact Number",
          value: "091234567890"
        }
      ].map(item => (
        <Box margin="stack-l">
          <Item NAME="personInformation-property" margin="inline-s">
            <Typography variant="body">{item.property}:</Typography>
          </Item>

          <Item>
            <Typography variant="body">{item.value}</Typography>
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
      department: "",
      username: "",
      email: "",
      requiredHours: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nickname: "",
      address: "",
      contactNumber: "",
      dateOfBirth: "",
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
            {/* >>> DEPARTMENT */}
            {/* >>> Department is not for administrators */}
            {this.state.person.role !== "administrator" && (
              <Box margin="stack-base">
                <Item NAME="personEdit-input-name" left margin="inline-base">
                  <Typography
                    variant="display-3"
                    as="label"
                    htmlFor="department-input"
                  >
                    Department
                  </Typography>
                </Item>

                <Item NAME="personEdit-input">
                  <SelectInput
                    id="department-input"
                    onChange={this.handleInputChange}
                    name="department"
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

            <Item NAME="personEdit-divider" margin="stack-base" />

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
