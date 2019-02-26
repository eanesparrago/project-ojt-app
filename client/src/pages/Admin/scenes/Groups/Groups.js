import React, { Component } from "react";
import styled from "styled-components";
import { Transition, Trail } from "react-spring/renderprops";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography } from "../../../../components/elements";
import { Item, Box, Container, Area } from "../../../../layout";
import { LoadingScene } from "src/components/compounds";

import GroupCard from "./components/GroupCard";
import Group from "./scenes/Group/Group";
import CreateGroup from "./scenes/CreateGroup";
import { PersonModal } from "src/pages/Admin/components";
import sceneStyles from "src/pages/Admin/adminScenesStyles";

import { getGroups } from "./groupsActionCreators";

const StyledGroups = styled.div`
  ${sceneStyles};

  .container-groups-group {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export class Groups extends Component {
  state = {
    isModalOpen: false
  };

  componentDidMount() {
    this.props.getGroups();
  }

  handleModalToggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { match, location, groups } = this.props;

    return (
      <StyledGroups>
        <Area NAME="admin-content-header" padding="inset-base">
          <Box wrap align="flex-start">
            <Item margin="wrap-base">
              <Typography variant="display-1">Groups</Typography>
            </Item>

            <Item margin="wrap-base">
              <Button
                variant="primary"
                as={Link}
                to={`${match.url}/create-group`}
              >
                <Item margin="inline-s">
                  <i className="fas fa-plus" />
                </Item>
                Create Group
              </Button>
            </Item>
          </Box>
        </Area>

        <Area NAME="admin-content-body" padding="inset-base">
          {/* >>> LoadingScene */}
          <Transition
            native
            items={groups.isLoading}
            keys={groups.isLoading}
            from={{ transform: "translateY(100%)", opacity: "0" }}
            enter={{ transform: "translateY(0%)", opacity: "1" }}
            leave={{ transform: "translateY(100%)", opacity: "0" }}
          >
            {show =>
              show &&
              (style => (
                <Container NAME="admin-loading" animate={style}>
                  <LoadingScene />
                </Container>
              ))
            }
          </Transition>

          <Box wrap>
            <Trail
              items={groups.data}
              keys={data => data._id}
              from={{ transform: "translateY(100%)", opacity: "0" }}
              to={{ transform: "translateY(0%)", opacity: "1" }}
              native
            >
              {group => style => (
                <Item margin="wrap-base" key={group._id} animate={style}>
                  <GroupCard data={group} />
                </Item>
              )}
            </Trail>
          </Box>
        </Area>

        {/* >>> Create Group Modal */}
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
                path={`${match.url}/create-group`}
                render={() => (
                  <Container NAME="admin-create" animate={style}>
                    <CreateGroup />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

        {/* >>> Group Modal */}
        <Transition
          native
          items={location}
          keys={location.pathname}
          from={{ transform: "translateY(100%)", opacity: "0" }}
          enter={{ transform: "translateY(0%)", opacity: "1" }}
          leave={{ transform: "translateY(100%)", opacity: "0" }}
        >
          {loc => style => (
            <Switch location={loc}>
              <Route
                path={`${match.url}/group/:id`}
                render={() => (
                  <Container NAME="groups-group" animate={style}>
                    <Group />
                  </Container>
                )}
              />
            </Switch>
          )}
        </Transition>

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
      </StyledGroups>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      groups: state.admin.groups
    }),
    { getGroups: getGroups }
  )(Groups)
);
