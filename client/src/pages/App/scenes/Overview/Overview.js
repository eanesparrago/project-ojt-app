import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";

import { getOwnGroup } from "src/services/session/actions/groupActionCreators";

export class Overview extends Component {
  componentDidMount() {
    this.props.getOwnGroup();
  }

  render() {
    const {
      group: { data, isLoading, errors }
    } = this.props;

    return (
      <Main>
        <Main.Header title="Technical Support Group" />

        <Main.Body isLoading={isLoading}>
          
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
