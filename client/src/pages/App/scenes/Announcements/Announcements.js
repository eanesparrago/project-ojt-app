import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";
import { TableAnnouncements } from "src/components/layouts/Table/compositions";

import { getAnnouncements } from "src/services/session/actions/announcementsActionCreators";

export class Announcements extends Component {
  componentDidMount() {
    this.props.getAnnouncements();
  }

  render() {
    const {
      announcements: { isLoading }
    } = this.props;

    return (
      <Main>
        <Main.Header
          title="Announcements"
          buttonText="Create Announcement"
          buttonPath="/create-announcement"
        />

        <Main.Body isLoading={isLoading}>
          <TableAnnouncements />
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    announcements: state.announcements
  }),
  { getAnnouncements: getAnnouncements }
)(Announcements);
