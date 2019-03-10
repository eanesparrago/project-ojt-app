import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Button, Typography } from "src/components/elements";
import { Item, Box, Container, Area } from "src/components/blocks";

import { getGroup } from "src/pages/Admin/scenes/Groups/groupsActionCreators";

import ActivityItem from "./components/ActivityItem";
import AnnouncementItem from "./components/AnnouncementItem";
import UserItem from "./components/UserItem";
import EditGroupForm from "./components/EditGroupForm";

import enums from "src/services/enums";

const StyledGroup = styled.div`
  /* border: 1px solid magenta; */
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-areas:
    "header announcements activity"
    "people announcements activity";
  grid-template-rows: auto 1fr;
  grid-template-columns: 3fr 2fr 2fr;
  background-color: ${p => p.theme.color.white};

  @media (max-width: ${p => p.theme.breakpoint.desktopL}){
    grid-template-areas:
    "header announcements announcements"
    "people announcements announcements"
    "people announcements announcements"
    "people activity activity"
    "people activity activity"
    "people activity activity";

    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
 
  .container-group-close {
    position: absolute;
    top: var(--size-base);
    right: var(--size-base);
  }

  /* >>> Header */
  .area-group-header {
    grid-area: header;
    background-color: ${p => p.theme.color.white};
    display: flex;
  }

  .container-group-header {
    flex-grow: 1;
  }

  /* >>> People */
  .area-group-people {
    /* border: 1px solid magenta; */
    grid-area: people;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${p => p.theme.color.white};
    overflow-y: auto;
    /* border-right: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-group-supervisors {
    /* border: 1px solid magenta; */
    padding-top: var(--size-s);
    overflow-y: auto;
  }

  .container-group-trainees {
    /* border: 1px solid magenta; */
    padding-top: var(--size-xs);
    overflow-y: auto;

  }

    /* >>> Announcements */
  .area-group-announcements {
    grid-area: announcements;
    background-color: ${p => p.theme.color.white};
    display: flex;
    flex-flow: column;

    /* border-right: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-group-announcements-header {
    /* border-bottom: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-group-announcements-content {
    padding-top: var(--size-xs);
    overflow-y: auto;
  }

    /* >>> Activty */
  .area-group-activity {
    grid-area: activity;
    background-color: ${p => p.theme.color.white};
    display: flex;
    flex-flow: column;
  }

  .container-group-activity-header {
    /* border-bottom: 1px solid ${p => p.theme.color.dark}; */
  }

  .container-group-activity-content {
    padding-top: var(--size-xs);
    overflow-y: auto;
  }

  .area-group-back {
    grid-area: back;
    background-color: ${p => p.theme.color.primary.dark};
    opacity: 0.8;
  }

  .item-group-icon {
    width: ${p => p.theme.size.m};
  }

  .item-group-edit-button {
    margin-left: auto;
  }
`;

export class Group extends Component {
  state = {
    isEditFormOpen: false
  };

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  handleEditFormToggle = e => {
    this.setState({ isEditFormOpen: !this.state.isEditFormOpen });
  };

  render() {
    const { history, location, match, data, isLoading } = this.props;
    const { isEditFormOpen } = this.state;

    console.log(data);

    return (
      <StyledGroup>
        <Container NAME="group-close">
          <Item>
            <Button variant="primary" icon rounded as={Link} to="/app/groups">
              <i className="fas fa-times" />
            </Button>
          </Item>
        </Container>

        {!isLoading ? (
          <Fragment>
            {/* >>> Header */}
            <Area NAME="group-header" padding="inset-base">
              <Container NAME="group-header" margin="inline-base">
                {!isEditFormOpen ? (
                  <Fragment>
                    <Box wrap align="flex-start">
                      <Item margin="stack-l">
                        <Typography variant="display-1">{data.name}</Typography>
                      </Item>
                    </Box>

                    {data.location && (
                      <Item margin="stack-base">
                        <Typography variant="caption">
                          <Item
                            NAME="group-icon"
                            center
                            inline
                            margin="inline-s"
                          >
                            <i className="fas fa-map-marker-alt" />
                          </Item>
                          {data.location}
                        </Typography>
                      </Item>
                    )}

                    {data.phoneNumber && (
                      <Item>
                        <Typography variant="caption">
                          <Item
                            NAME="group-icon"
                            center
                            inline
                            margin="inline-s"
                          >
                            <i className="fas fa-phone" />
                          </Item>
                          {data.phoneNumber}
                        </Typography>
                      </Item>
                    )}
                  </Fragment>
                ) : (
                  <Item>
                    <EditGroupForm
                      handleEditFormToggle={this.handleEditFormToggle}
                    />
                  </Item>
                )}
              </Container>

              {!isEditFormOpen && (
                <Item NAME="group-edit-button" top>
                  <Button
                    variant="secondary"
                    icon
                    onClick={this.handleEditFormToggle}
                  >
                    <i className="fas fa-cog" />
                    <span id="hidden">Edit</span>
                  </Button>
                </Item>
              )}
            </Area>

            {/* >>> People */}
            <Area NAME="group-people">
              <Container NAME="group-supervisors" padding="inset-base">
                <Container margin="stack-l">
                  <Box margin="stack-m" align="center">
                    <Item margin="inline-m">
                      <Typography variant="display-2">Supervisors</Typography>
                    </Item>

                    <Item>
                      <Button variant="secondary" icon rounded>
                        <i className="fas fa-plus" />
                      </Button>
                    </Item>
                  </Box>

                  <Box column>
                    {data.users
                      .filter(user => user.role === enums.roles.SUPERVISOR)
                      .map(user => (
                        <Item margin="stack-m">
                          <UserItem data={user} />
                        </Item>
                      ))}
                  </Box>
                </Container>

                <Container>
                  <Box margin="stack-m" align="center">
                    <Item margin="inline-m">
                      <Typography variant="display-2">Employees</Typography>
                    </Item>

                    <Item>
                      <Button variant="secondary" icon rounded>
                        <i className="fas fa-plus" />
                      </Button>
                    </Item>
                  </Box>

                  <Box column>
                    {data.users
                      .filter(user => user.role === enums.roles.EMPLOYEE)
                      .map(user => (
                        <Item margin="stack-m">
                          <UserItem data={user} />
                        </Item>
                      ))}
                  </Box>
                </Container>
              </Container>

              {/* >>> Trainees */}
              <Container NAME="group-trainees" padding="inset-base">
                <Box margin="stack-m" align="center">
                  <Item margin="inline-m">
                    <Typography variant="display-2">Trainees</Typography>
                  </Item>

                  <Item>
                    <Button variant="secondary" icon rounded>
                      <i className="fas fa-plus" />
                    </Button>
                  </Item>
                </Box>

                <Box column>
                  {data.users
                    .filter(user => user.role === enums.roles.TRAINEE)
                    .map(user => (
                      <Item margin="stack-m">
                        <UserItem data={user} />
                      </Item>
                    ))}
                </Box>
              </Container>
            </Area>

            {/* >>> Announcements */}
            <Area NAME="group-announcements">
              <Container NAME="group-announcements-header" padding="inset-base">
                <Box align="center">
                  <Item margin="inline-base">
                    <Typography variant="display-2">Announcements</Typography>
                  </Item>

                  <Item>
                    <Button variant="secondary" icon rounded>
                      <i className="fas fa-plus" />
                    </Button>
                  </Item>
                </Box>
              </Container>

              <Container
                NAME="group-announcements-content"
                padding="inset-base"
              >
                {Array(3)
                  .fill(null)
                  .map(item => (
                    <Item margin="stack-base">
                      <AnnouncementItem />
                    </Item>
                  ))}
              </Container>
            </Area>

            {/* >>> Activity */}
            <Area NAME="group-activity">
              <Container NAME="group-activity-header" padding="inset-base">
                <Box align="center">
                  <Item margin="inline-base">
                    <Typography variant="display-2">Activity</Typography>
                  </Item>

                  <Item style={{ visibility: "hidden" }}>
                    <Button variant="primary" variant="primary" icon rounded>
                      <i className="fas fa-plus" />
                    </Button>
                  </Item>
                </Box>
              </Container>

              <Container NAME="group-activity-content" padding="inset-base">
                {Array(5)
                  .fill(null)
                  .map(item => (
                    <Item margin="stack-l">
                      <ActivityItem />
                    </Item>
                  ))}
              </Container>
            </Area>

            {/* >>> Back */}
            <Area
              NAME="group-back"
              onClick={() => {
                history.goBack();
              }}
            />
          </Fragment>
        ) : null}
      </StyledGroup>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      data: state.admin.groups.group,
      isLoading: state.admin.groups.isLoading
    }),
    { getGroup: getGroup }
  )(Group)
);
