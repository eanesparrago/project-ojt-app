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

  > .area-header {
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

  > .container-main {
    /* border: 1px solid cyan; */
    flex-grow: 1;
    display: flex;

    > .area-sidebar {
      width: ${p => p.theme.incrementFixed(10)};
      height: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      background-color: ${p => p.theme.color.white};
      border-right: 1px solid ${p => p.theme.color.dark};
      position: fixed;
      top: ${p => p.theme.incrementFixed(3)};

      > .container-profile {
        /* border: 1px solid magenta; */
        display: flex;
        flex-flow: column;
        align-items: center;
        position: relative;
        text-align: center;

        > .item-profile-photo {
          width: ${p => p.theme.increment(6)};
          height: ${p => p.theme.increment(6)};
        }

        > .item-divider {
          height: 1px;
          width: calc(100% - var(--size-base) * 2);
          background-color: ${p => p.theme.color.dark};
          position: absolute;
          bottom: 0;
        }
      }
    }

    > .area-content {
      /* border: 1px solid green; */
      height: calc(100% - ${p => p.theme.incrementFixed(3)});
      width: 100%;
      background-color: ${p => p.theme.color.light};
      margin-top: ${p => p.theme.incrementFixed(3)};
      margin-left: ${p => p.theme.incrementFixed(10)};
      display: flex;
      flex-flow: column;
      position: relative;

      > .area-content-header {
        background-color: ${p => p.theme.color.white};
        border-bottom: 1px solid ${p => p.theme.color.dark};
        padding-bottom: ${p => p.theme.size.s};
      }

      > .area-content-body {
        overflow: auto;
        width: 100%;
      }

      > .container-department-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      > .container-department-modal {
        /* border: 1px solid magenta; */
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export class Admin extends Component {
  state = {
    isDepartmentModalOpen: false,
    isDepartmentFormOpen: false
  };

  handleDepartmentModalToggle = () => {
    this.setState({ isDepartmentModalOpen: !this.state.isDepartmentModalOpen });
  };

  handleDepartmentFormToggle = () => {
    this.setState({ isDepartmentFormOpen: !this.state.isDepartmentFormOpen });
  };

  render() {
    const { isDepartmentModalOpen, isDepartmentFormOpen } = this.state;
    const { match } = this.props;

    return (
      <StyledAdmin>
        {/* >>> Header */}
        <Area name="header" padding="inset-m">
          <Item>
            <Typography variant="display-4">SPi OJT App</Typography>
          </Item>

          <Item>
            <Button variant="text" icon>
              <i className="fas fa-ellipsis-h" />
            </Button>
          </Item>
        </Area>

        <Container name="main">
          {/* >>> Sidebar */}
          <Area name="sidebar">
            <Container name="profile" padding="inset-base">
              <Item name="profile-photo" margin="stack-m">
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

              <Item name="divider" />
            </Container>

            <Box column padding="inset-m">
              <Link to={`${match.url}/departments`}>
                <Item left margin="stack-s">
                  <Button variant="text" full left>
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className="fas fa-briefcase" />
                    </Item>
                    Departments
                  </Button>
                </Item>
              </Link>

              <Link to={`${match.url}/users`}>
                <Item margin="stack-s">
                  <Button variant="text" full left>
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className="fas fa-users" />
                    </Item>
                    Users
                  </Button>
                </Item>
              </Link>

              <Link to={`${match.url}/notifications`}>
                <Item margin="stack-s">
                  <Button variant="text" full left>
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className="fas fa-bell" />
                    </Item>
                    Notifications
                  </Button>
                </Item>
              </Link>

              <Link to={`${match.url}/announcements`}>
                <Item margin="stack-s">
                  <Button variant="text" full left>
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className="fas fa-bullhorn" />
                    </Item>
                    Announcements
                  </Button>
                </Item>
              </Link>

              <Link to={`${match.url}/activities`}>
                <Item margin="stack-s">
                  <Button variant="text" full left>
                    <Item center style={{ width: "2rem" }} margin="inline-s">
                      <i className="fas fa-list-ul" />
                    </Item>
                    Activities
                  </Button>
                </Item>
              </Link>
            </Box>
          </Area>

          {/* >>> Content */}
          <Area name="content">
            <Route
              path={`${match.url}/departments`}
              render={() => (
                <Departments
                  isDepartmentFormOpen={isDepartmentFormOpen}
                  isDepartmentModalOpen={isDepartmentModalOpen}
                  onDepartmentFormToggle={this.handleDepartmentFormToggle}
                  onDepartmentModalToggle={this.handleDepartmentModalToggle}
                />
              )}
            />
          </Area>
        </Container>
      </StyledAdmin>
    );
  }
}

export default withRouter(Admin);
