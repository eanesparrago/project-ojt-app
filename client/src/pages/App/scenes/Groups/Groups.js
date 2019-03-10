import React, { Component } from "react";
import { connect } from "react-redux";

import { Box, Item } from "src/components/blocks";
import { Main } from "src/pages/App/components";

import GroupCard from "./components/GroupCard";

import { getGroups } from "src/services/session/actions/groupsActionCreators";

export class Groups extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const { groups } = this.props;

    return (
      <Main>
        <Main.Header
          title="Groups"
          buttonText="Create Group"
          buttonPath="/create-group"
        />

        <Main.Body isLoading={groups.isLoading}>
          <Box wrap padding="inset-base">
            {groups.data.map(group => (
              <Item margin="wrap-base" key={group._id}>
                <GroupCard data={group} />
              </Item>
            ))}
          </Box>
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    groups: state.groups
  }),
  { getGroups: getGroups }
)(Groups);
