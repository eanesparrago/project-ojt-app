import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { Button, Typography } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";

import CreateAnnouncement from "./scenes/CreateAnnouncement";
import AnnouncementTable from "./components/AnnouncementTable";

const StyledAnnouncements = styled.div`
  /* border: 1px solid magenta; */
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;

  .area-announcements-content-header {
    background-color: ${p => p.theme.color.white};
    border-bottom: 1px solid ${p => p.theme.color.dark};
    padding-bottom: ${p => p.theme.size.s};
  }

  .area-announcements-content-body {
    /* border: 1px solid blue; */
    overflow: auto;
    width: 100%;
    max-height: 100%;
  }

  .container-announcements-create-department {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .container-announcements-department {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export class Announcements extends Component {
  state = {
    isModalOpen: false
  };

  handleModalToggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { match, location } = this.props;

    return (
      <StyledAnnouncements>
        <Area NAME="announcements-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">Announcements</Typography>
            </Item>

            <Item margin="wrap-base">
              <Button
                variant="primary"
                as={Link}
                to={`${match.url}/create-announcement`}
              >
                <Item margin="inline-s">
                  <i className="fas fa-plus" />
                </Item>
                Create Announcement
              </Button>
            </Item>
          </Box>
        </Area>

        <Area NAME="announcements-content-body" padding="inset-base">
          <AnnouncementTable />
        </Area>

        {/* >>> Create Announcement Modal */}
        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ transform: "translateX(-100%)" }}
          enter={{ transform: "translateX(0%)" }}
          leave={{ transform: "translateX(-100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/create-announcement`}
                render={() => (
                  <Container
                    NAME="announcements-create-department"
                    animate={style}
                  >
                    <CreateAnnouncement />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        {/* >>> Department Modal */}

        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ transform: "translateY(100%)" }}
          enter={{ transform: "translateY(0%)" }}
          leave={{ transform: "translateY(100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/technical-support-group`}
                render={() => (
                  <Container NAME="announcements-department" animate={style} />
                )}
              />
            </Switch>
          )}
        </Transition>
      </StyledAnnouncements>
    );
  }
}

export default withRouter(Announcements);
