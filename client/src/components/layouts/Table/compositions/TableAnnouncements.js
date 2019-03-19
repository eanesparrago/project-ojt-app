import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "src/components/layouts";

export class TableAnnouncements extends Component {
  render() {
    const {
      announcements: { announcements }
    } = this.props;

    return (
      <Table>
        <Table.Header />

        {announcements && (
          <Table.Body
            headings={[
              {
                property: ["user.profilePictureUrl", "user.username"],
                title: "Username",
                type: "user"
              },
              {
                property: "dateCreated",
                title: "Date Created",
                type: "date"
              },
              {
                property: "user.role",
                title: "Role"
              },
              {
                property: "group.name",
                title: "Group"
              },
              {
                property: "message",
                title: "Message"
              }
            ]}
            data={announcements}
            route="/announcement"
          />
        )}
      </Table>
    );
  }
}

export default connect(
  state => ({
    announcements: state.announcements
  }),
  null
)(TableAnnouncements);
