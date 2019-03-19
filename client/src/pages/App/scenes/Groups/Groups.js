import React, { Component } from "react";
import { connect } from "react-redux";

import { Box, Item } from "src/components/blocks";
import { Main } from "src/pages/App/components";

import GroupCard from "./components/GroupCard";

import { getGroups } from "src/services/session/actions/groupsActionCreators";
import enums from "src/services/enums";

export class Groups extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const {
      groups: { isLoading, data }
    } = this.props;

    return (
      <Main>
        <Main.Header
          title="Groups"
          buttonText="Create Group"
          buttonPath="/create-group"
          buttonPermissions={[enums.roles.ADMINISTRATOR]}
        />

        <Main.Body isLoading={isLoading}>
          {data !== null && (
            <Box wrap padding="inset-base">
              {data.map(group => (
                <Item margin="wrap-base" key={group._id}>
                  <GroupCard data={group} />
                </Item>
              ))}
            </Box>
          )}
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
