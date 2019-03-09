import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { Button, Typography } from "../../../../components/elements";
import { Item, Box, Container, Area } from "src/components/blocks";

import CreateAnnouncement from "./scenes/CreateAnnouncement";
import AnnouncementTable from "./components/AnnouncementTable";

import { PersonModal } from "src/pages/Admin/components";
import adminScenesStyles from "src/pages/Admin/adminScenesStyles";

const StyledAnnouncements = styled.div`
  ${adminScenesStyles};
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
        <Area NAME="admin-content-header" padding="inset-base">
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

        <Area NAME="admin-content-body" padding="inset-base">
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
                  <Container NAME="admin-create" animate={style}>
                    <CreateAnnouncement />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        {/* >>> announcements Modal */}

        <Transition
          native
          items={location}
          keys={location.pathname
            .split("/")
            .slice(2, 4)
            .join("/")}
          from={{ transform: "translateX(-100%)" }}
          enter={{ transform: "translateX(0%)" }}
          leave={{ transform: "translateX(-100%)" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/person/:id`}
                render={() => (
                  <Container NAME="admin-person" animate={style}>
                    <PersonModal />
                  </Container>
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
