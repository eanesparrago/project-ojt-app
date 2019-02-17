import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Button, Typography, Photo } from "../../components/elements";
import { Item, Box, Container, Area } from "../../layout";
import profileImage from "./profile.png";

import Departments from "./scenes/Departments/Departments";

const StyledAdmin = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;

  .area-admin-header {
    border: 1px solid magenta;
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${p => p.theme.color.dark};
    color: ${p => p.theme.color.light};
  }

  .area-admin-sidebar {
    grid-area: sidebar;
    display: flex;
    flex-flow: column;
    background-color: ${p => p.theme.color.white};
    border-right: 1px solid ${p => p.theme.color.dark};
    overflow: auto;
  }

  .area-admin-main {
    /* border: 10px solid green; */
    grid-area: main;
    background-color: ${p => p.theme.color.light};
    overflow: auto;
  }

  .container-admin-profile {
    /* border: 1px solid magenta; */
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;
    text-align: center;
  }

  .item-admin-profile-photo {
    width: ${p => p.theme.increment(6)};
    height: ${p => p.theme.increment(6)};
  }

  .item-admin-divider {
    height: 1px;
    width: calc(100% - var(--size-base) * 2);
    background-color: ${p => p.theme.color.dark};
    position: absolute;
    bottom: 0;
  }
`;

export class Admin extends Component {
  render() {
    const { match } = this.props;

    return (
      <StyledAdmin>
        {/* >>> Header */}
        <Area NAME="admin-header" padding="inset-m">
          <Item>
            <Typography variant="display-4">SPi OJT App</Typography>
          </Item>

          <Item>
            <Button variant="text" icon>
              <i className="fas fa-ellipsis-h" />
            </Button>
          </Item>
        </Area>

        {/* >>> Sidebar */}
        <Area NAME="admin-sidebar">
          <Container NAME="admin-profile" padding="inset-base">
            <Item NAME="admin-profile-photo" margin="stack-m">
              <Photo rounded>
                <img src={profileImage} alt="" />
              </Photo>
            </Item>

            <Item margin="stack-m">
              <Typography variant="display-3">Steven Universe</Typography>
            </Item>

            <Item>
              <Typography variant="display-4">Administrator</Typography>
            </Item>

            <Item NAME="admin-divider" />
          </Container>

          <Box column padding="inset-m">
            <Item left margin="stack-s">
              <Button
                variant="text"
                full
                left
                as={Link}
                to={`${match.url}/departments`}
              >
                <Item center style={{ width: "2rem" }} margin="inline-s">
                  <i className="fas fa-briefcase" />
                </Item>
                Departments
              </Button>
            </Item>

            <Item margin="stack-s">
              <Button
                variant="text"
                full
                left
                as={Link}
                to={`${match.url}/people`}
              >
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
        </Area>

        {/* >>> Main */}
        <Area NAME="admin-main">
          <Route
            path={`${match.url}/departments`}
            render={() => <Departments />}
          />
        </Area>
      </StyledAdmin>
    );
  }
}

export default withRouter(Admin);
