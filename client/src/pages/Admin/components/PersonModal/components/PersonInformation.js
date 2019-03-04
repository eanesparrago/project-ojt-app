import React, { Fragment } from "react";
import format from "date-fns/format";

import { Typography } from "src/components/elements";
import { Item, Box } from "src/layout";
import enums from "src/services/enums";

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
        },
        {
          property: "Account Status",
          value: data.isActive ? "Active" : "Inactive",
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
                {item.value === "" || item.value === null ? "N/A" : item.value}
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
          value:
            data.roleData.dateOfBirth &&
            format(data.roleData.dateOfBirth, "MM-DD-YYYY"),
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
                {item.value === "" || item.value === null ? "N/A" : item.value}
              </Typography>
            </Item>
          </Box>
        ))}
    </Fragment>
  );
};

export default PersonInformation;
