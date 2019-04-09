import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Item, Box, Container } from "src/components/blocks";
import { Photo, Typography, Button, Divider } from "src/components/elements";
import { LoadingScene } from "src/components/compounds";

import profilePhotoPlaceholder from "src/assets/images/profile-photo-placeholder.png";
import enums from "src/services/enums";

const StyledSidebar = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: ${p => p.theme.color.black};
  overflow-y: auto;
  color: ${p => p.theme.color.light};
  padding: var(--size-base);
  flex-shrink: 0;
  position: relative;
  z-index: 100;

  .container-sidebar-profile {
    flex-shrink: 0;
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

  .box-nav {
    flex-grow: 1;
  }

  .item-profile {
    margin-top: auto;
  }
`;

const adminMenu = [
  {
    title: "Groups",
    icon: "fas fa-briefcase",
    to: "/groups"
  },
  {
    title: "Requests",
    icon: "fas fa-bell",
    to: "/requests"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  }
];

const supervisorMenu = [
  {
    title: "My Group",
    icon: "fas fa-eye",
    to: "/group"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  }
];

const employeeMenu = [
  {
    title: "My Group",
    icon: "fas fa-eye",
    to: "/group"
  },
  {
    title: "People",
    icon: "fas fa-users",
    to: "/people"
  },
  {
    title: "Announcements",
    icon: "fas fa-bullhorn",
    to: "/announcements"
  }
];

const traineeMenu = [
  {
    title: "My Group",
    icon: "fas fa-briefcase",
    to: "/group"
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
  }
];

export class Sidebar extends Component {
  render() {
    const {
      user: { data },
      match
    } = this.props;

    const menu =
      data &&
      ((data.role === enums.roles.ADMINISTRATOR && adminMenu) ||
        (data.role === enums.roles.SUPERVISOR && supervisorMenu) ||
        (data.role === enums.roles.EMPLOYEE && employeeMenu) ||
        (data.role === enums.roles.TRAINEE && traineeMenu));

    return (
      <StyledSidebar>
        <Item as={Link} to="/" margin="stack-l" center>
          <Typography variant="display-4">Parousía</Typography>
        </Item>

        {data ? (
          <Fragment>
            <Container NAME="sidebar-profile" margin="stack-base">
              <Item NAME="sidebar-profile-picture" margin="stack-m">
                <Photo rounded>
                  <img
                    src={data.profilePictureUrl || profilePhotoPlaceholder}
                    alt=""
                  />
                </Photo>
              </Item>

              <Item margin="stack-m">
                <Typography variant="display-3">{data.username}</Typography>
              </Item>

              <Item margin="stack-base">
                <Typography variant="caption">
                  {enums.roles.properties[data.role].label}
                </Typography>
              </Item>

              <Divider />
            </Container>

            <Box NAME="nav" column>
              {menu.map(item => (
                <Item left margin="stack-s" key={item.title}>
                  <Button
                    variant="text"
                    full
                    left
                    as={NavLink}
                    to={`${match.url}${item.to}`}
                    activeClassName="active"
                  >
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className={item.icon} />
                    </Item>
                    {item.title}
                  </Button>
                </Item>
              ))}

              <Item NAME="profile" left margin="stack-s">
                <Button
                  variant="text"
                  full
                  left
                  as={NavLink}
                  to={`${match.url}/profile`}
                  activeClassName="active"
                >
                  <Item center style={{ width: "2rem" }} margin="inline-s">
                    <i className="fas fa-user-circle" />
                  </Item>
                  My Profile
                </Button>
              </Item>
            </Box>
          </Fragment>
        ) : (
          <LoadingScene />
        )}
      </StyledSidebar>
    );
  }
}

export default withRouter(
  connect(
    state => ({ user: state.user }),
    null
  )(Sidebar)
);
