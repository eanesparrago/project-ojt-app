import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";
import { Group } from "src/components/fragments";

import { getOwnGroup } from "src/services/session/actions/groupActionCreators";

export class Overview extends Component {
  render() {
    const {
      group: { isLoading }
    } = this.props;

    return (
      <Main>
        <Main.Header title="My Group" />

        <Main.Body isLoading={isLoading}>
          <Group />
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    group: state.group
  }),
  {
    getOwnGroup: getOwnGroup
  }
)(Overview);
