import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";

export class Announcements extends Component {
  componentDidMount() {}

  render() {
    return (
      <Main>
        <Main.Header
          title="Announcements"
          buttonText="Create Announcement"
          buttonPath="/create-announcement"
        />

        <Main className="Body" />
      </Main>
    );
  }
}

export default connect()(Announcements);
