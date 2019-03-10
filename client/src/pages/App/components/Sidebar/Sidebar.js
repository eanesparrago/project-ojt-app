import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Item, Box, Container } from "src/components/blocks";
import { Photo, Typography, Button, Divider } from "src/components/elements";

const StyledSidebar = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: ${p => p.theme.color.dark};
  overflow-y: auto;
  color: ${p => p.theme.color.light};
  padding: var(--size-base);

  .container-sidebar-profile {
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;
    text-align: center;
  }

  .item-sidebar-profile-picture {
    width: ${p => p.theme.increment(6)};
    height: ${p => p.theme.increment(6)};
  }
`;

const Sidebar = ({ match, user }) => {
  return (
    <StyledSidebar>
      <Container NAME="sidebar-profile" margin="stack-base">
        <Item NAME="sidebar-profile-picture" margin="stack-m">
          <Photo rounded>
            <img src={user.profilePictureUrl} alt="" />
          </Photo>
        </Item>

        <Item margin="stack-m">
          <Typography variant="display-3">{user.username}</Typography>
        </Item>

        <Item margin="stack-base">
          <Typography>{user.role}</Typography>
        </Item>

        <Divider />
      </Container>

      <Box column>
        <Item left margin="stack-s">
          <Button variant="text" full left as={Link} to={`${match.url}/groups`}>
            <Item center style={{ width: "2rem" }} margin="inline-s">
              <i className="fas fa-briefcase" />
            </Item>
            Groups
          </Button>
        </Item>

        <Item margin="stack-s">
          <Button variant="text" full left as={Link} to={`${match.url}/people`}>
            <Item center style={{ width: "2rem" }} margin="inline-s">
              <i className="fas fa-users" />
            </Item>
            People
          </Button>
        </Item>

        <Item margin="stack-s">
          <Button
            variant="text"
            full
            left
            as={Link}
            to={`${match.url}/notifications`}
          >
            <Item center style={{ width: "2rem" }} margin="inline-s">
              <i className="fas fa-bell" />
            </Item>
            Notifications
          </Button>
        </Item>

        <Item margin="stack-s">
          <Button
            variant="text"
            full
            left
            as={Link}
            to={`${match.url}/announcements`}
          >
            <Item center style={{ width: "2rem" }} margin="inline-s">
              <i className="fas fa-bullhorn" />
            </Item>
            Announcements
          </Button>
        </Item>

        <Item margin="stack-s">
          <Button
            variant="text"
            full
            left
            as={Link}
            to={`${match.url}/activities`}
          >
            <Item center style={{ width: "2rem" }} margin="inline-s">
              <i className="fas fa-list-ul" />
            </Item>
            Activities
          </Button>
        </Item>
      </Box>
    </StyledSidebar>
  );
};

export default withRouter(
  connect(
    state => ({ user: state.auth.user }),
    null
  )(Sidebar)
);
