import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography } from "src/components/elements";
import { Item, Box } from "src/components/blocks";
import UserItem from "./UserItem";

import enums from "src/services/enums";

const StyledGroupPeople = styled.section`
  grid-area: people;
  overflow-y: auto;
  border-right: 2px solid ${p => p.theme.color.primary.light};
`;

const GroupPeople = ({ groupData: { users }, match, auth }) => {
  const supervisors = users.filter(
    user => user.role === enums.roles.SUPERVISOR
  );
  const employees = users.filter(user => user.role === enums.roles.EMPLOYEE);

  return (
    <StyledGroupPeople>
      <Box margin="stack-l">
        <Item center margin="inline-base">
          <Typography variant="display-3">
            Supervisors ({supervisors.length})
          </Typography>
        </Item>

        {auth.user.role === enums.roles.ADMINISTRATOR && (
          <Item>
            <Button
              variant="secondary"
              as={Link}
              to={{
                pathname: `${match.url}/create-person`,
                state: { role: enums.roles.SUPERVISOR, group: match.params.id }
              }}
              icon
              rounded
            >
              <i className="fas fa-plus" />
            </Button>
          </Item>
        )}
      </Box>

      <Box column margin="stack-l">
        {supervisors.map(supervisor => (
          <Item margin="stack-base" key={supervisor._id}>
            <UserItem user={supervisor} />
          </Item>
        ))}
      </Box>

      <Box margin="stack-m">
        <Item center margin="inline-base">
          <Typography variant="display-3">
            Employees ({employees.length})
          </Typography>
        </Item>

        {auth.user.role === enums.roles.ADMINISTRATOR && (
          <Item>
            <Button
              variant="secondary"
              as={Link}
              to={{
                pathname: `${match.url}/create-person`,
                state: { role: enums.roles.EMPLOYEE, group: match.params.id }
              }}
              icon
              rounded
            >
              <i className="fas fa-plus" />
            </Button>
          </Item>
        )}
      </Box>

      <Box column margin="stack-m">
        {employees.map(employee => (
          <Item margin="stack-base" key={employee._id}>
            <UserItem user={employee} />
          </Item>
        ))}
      </Box>
    </StyledGroupPeople>
  );
};

export default withRouter(
  connect(state => ({
    auth: state.auth
  }))(GroupPeople)
);
