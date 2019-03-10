import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

import { Item, Box, Container } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { Avatar } from "src/components/compounds";

import enums from "src/services/enums";

const StyledGroupCard = styled.div`
  width: ${p => p.theme.incrementFixed(16)};
  background-color: ${p => p.theme.color.white};
  box-shadow: ${p => p.theme.shadow[1]};
  border-radius: ${p => p.theme.size.base};
  overflow: hidden;
  transition-duration: 100ms;
  transition-property: box-shadow;
  transition-timing-function: ease-out;
  display: flex;
  flex-flow: column;

  &:hover {
    box-shadow: ${p => p.theme.shadow[2]};
  }

  .container-groupCard {
    flex-grow: 1;
  }

  .item-icon {
    width: ${p => p.theme.size.m};
  }
`;

const GroupCard = ({ match, data }) => {
  return (
    <StyledGroupCard>
      <Container NAME="groupCard" padding="inset-base">
        <Item margin="stack-base">
          <Typography variant="display-3">{data.name}</Typography>
        </Item>

        {data.location ? (
          <Box margin="stack-m">
            <Item top NAME="icon" inline center margin="inline-s">
              <i className="fas fa-map-marker-alt" />
            </Item>

            <Item center>
              <Typography variant="caption">{data.location}</Typography>
            </Item>
          </Box>
        ) : null}

        {data.phoneNumber ? (
          <Box margin="stack-base">
            <Item top NAME="icon" inline center margin="inline-s">
              <i className="fas fa-phone" />
            </Item>

            <Item center>
              <Typography variant="caption">{data.phoneNumber}</Typography>
            </Item>
          </Box>
        ) : null}

        <Item margin="stack-s">
          <Typography variant="display-4">Supervisors</Typography>
          <Typography variant="body">
            &nbsp;(
            {
              data.users.filter(user => user.role === enums.roles.SUPERVISOR)
                .length
            }
            )
          </Typography>
        </Item>

        <Box margin="stack-base" wrap>
          {data.users
            .filter(user => user.role === enums.roles.SUPERVISOR)
            .map(user => (
              <Item margin="wrap-s" key={user._id}>
                <Avatar src={user.profilePictureUrl} id={user._id} />
              </Item>
            ))}
        </Box>

        <Item margin="stack-s">
          <Typography variant="display-4">Trainees</Typography>
          <Typography variant="body">
            &nbsp;(
            {
              data.users.filter(user => user.role === enums.roles.TRAINEE)
                .length
            }
            )
          </Typography>
        </Item>

        <Box margin="stack-base" wrap>
          {data.users
            .filter(user => user.role === enums.roles.TRAINEE)
            .map(user => (
              <Item margin="wrap-s" key={user._id}>
                <Avatar src={user.profilePictureUrl} id={user._id} />
              </Item>
            ))}
        </Box>

        <Item margin="stack-s">
          <Typography variant="display-4">Employees</Typography>

          <Typography variant="body">
            &nbsp;(
            {
              data.users.filter(user => user.role === enums.roles.EMPLOYEE)
                .length
            }
            )
          </Typography>
        </Item>

        <Box wrap>
          {data.users
            .filter(user => user.role === enums.roles.EMPLOYEE)
            .map(user => (
              <Item margin="wrap-s" key={user._id}>
                <Avatar src={user.profilePictureUrl} id={user._id} />
              </Item>
            ))}
        </Box>
      </Container>

      <Item NAME="groupCard-view-button" padding="inset-base">
        <Button
          as={Link}
          to={`${match.url}/group/${data._id}`}
          variant="secondary"
          full
        >
          View Group
        </Button>
      </Item>
    </StyledGroupCard>
  );
};

export default withRouter(GroupCard);
