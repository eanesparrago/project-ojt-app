import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { LoadingScene } from "src/components/compounds";
import GroupHeader from "./components/GroupHeader";
import GroupTrainees from "./components/GroupTrainees";
import GroupPeople from "./components/GroupPeople";
import GroupAnnouncements from "./components/GroupAnnouncements";

import { getGroup } from "src/services/session/actions/groupActionCreators";
import { getOwnGroup } from "src/services/session/actions/groupActionCreators";
import enums from "src/services/enums";

const StyledGroup = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.color.white};
  display: grid;
  grid-template-areas:
    "header header header"
    "trainees people announcements";
  grid-template-rows: auto 1fr;
  grid-template-columns: 3fr 2fr 2fr;
  grid-column-gap: var(--size-base);
  padding: var(--size-base);
  position: relative;
`;

export class Group extends Component {
  componentDidMount() {
    const { getGroup, getOwnGroup, match, auth } = this.props;

    if (auth.user.role === enums.roles.ADMINISTRATOR) {
      getGroup(match.params.id);
    } else {
      getOwnGroup();
    }
  }

  render() {
    const {
      group: { data, isLoading }
    } = this.props;

    return (
      <StyledGroup>
        {isLoading && <LoadingScene absolute />}

        {data && (
          <Fragment>
            <GroupHeader groupData={data} />

            <GroupTrainees groupData={data} />

            <GroupPeople groupData={data} />

            <GroupAnnouncements groupData={data} />
          </Fragment>
        )}
      </StyledGroup>
    );
  }
}
export default withRouter(
  connect(
    state => ({
      auth: state.auth,
      group: state.group
    }),
    { getGroup, getOwnGroup }
  )(Group)
);
