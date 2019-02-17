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
  display: flex;
  flex-flow: column;

  .area-admin-header {
    /* border: 1px solid magenta; */
    width: 100%;
    height: ${p => p.theme.incrementFixed(3)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${p => p.theme.color.dark};
    color: ${p => p.theme.color.light};
    position: fixed;
  }

  .container-admin-main {
    /* border: 1px solid cyan; */
    flex-grow: 1;
    display: flex;
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

  .area-admin-sidebar {
    width: ${p => p.theme.incrementFixed(10)};
    height: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: ${p => p.theme.color.white};
    border-right: 1px solid ${p => p.theme.color.dark};
    position: fixed;
    top: ${p => p.theme.incrementFixed(3)};
  }

  .area-admin-content {
    /* border: 10px solid green; */
    width: 100%;
    background-color: ${p => p.theme.color.light};
    margin-top: ${p => p.theme.incrementFixed(3)};
    margin-left: ${p => p.theme.incrementFixed(10)};
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

        <Container NAME="admin-main">
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

          {/* >>> Content */}
          <Area NAME="admin-content">
            <Route
              path={`${match.url}/departments`}
              render={() => <Departments />}
            />
          </Area>
        </Container>
      </StyledAdmin>
    );
  }
}

export default withRouter(Admin);
