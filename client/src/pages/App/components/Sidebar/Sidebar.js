import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Item, Box, Container } from "src/components/blocks";
import { Photo, Typography, Button, Divider } from "src/components/elements";

import enums from "src/services/enums";

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

const adminMenu = [
  {
    title: "Groups",
    icon: "fas fa-briefcase",
    to: "/groups"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Notifications",
    icon: "fas fa-bell",
    to: "/notifications"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  },
  {
    title: "Activities",
    icon: "fas fa-list-ul",
    to: "/activities"
  },
  {
    title: "My Profile",
    icon: "fas fa-user-circle",
    to: "/profile"
  }
];

const supervisorMenu = [
  {
    title: "My Group",
    icon: "fas fa-briefcase",
    to: "/group"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Notifications",
    icon: "fas fa-bell",
    to: "/notifications"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  },
  {
    title: "Activities",
    icon: "fas fa-list-ul",
    to: "/activities"
  },
  {
    title: "My Profile",
    icon: "fas fa-user-circle",
    to: "/profile"
  }
];

const employeeMenu = [
  {
    title: "My Group",
    icon: "fas fa-briefcase",
    to: "/group"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Notifications",
    icon: "fas fa-bell",
    to: "/notifications"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  },
  {
    title: "Activities",
    icon: "fas fa-list-ul",
    to: "/activities"
  },
  {
    title: "My Profile",
    icon: "fas fa-user-circle",
    to: "/profile"
  }
];

const traineeMenu = [
  {
    title: "My Group",
    icon: "fas fa-briefcase",
    to: "/group"
  },
  {
    title: "Notifications",
    icon: "fas fa-bell",
    to: "/notifications"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  },
  {
    title: "Tasks",
    icon: "far fa-check-circle",
    to: "/tasks"
  },
  {
    title: "My Profile",
    icon: "fas fa-user-circle",
    to: "/profile"
  }
];

const Sidebar = ({ match, user }) => {
  const menu =
    (user.role === enums.roles.ADMINISTRATOR && adminMenu) ||
    (user.role === enums.roles.SUPERVISOR && supervisorMenu) ||
    (user.role === enums.roles.EMPLOYEE && employeeMenu) ||
    (user.role === enums.roles.TRAINEE && traineeMenu);

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
        {menu.map(item => (
          <Item left margin="stack-s" key={item.title}>
            <Button
              variant="text"
              full
              left
              as={Link}
              to={`${match.url}${item.to}`}
            >
              <Item center style={{ width: "2rem" }} margin="inline-s">
                <i className={item.icon} />
              </Item>
              {item.title}
            </Button>
          </Item>
        ))}
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
