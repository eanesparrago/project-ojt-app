import React, { Component } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

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
            headings={["Date Created", "Username", "Role", "Group", "Message"]}
            data={announcements.map(announcement => [
              format(announcement.dateCreated, "MM-DD-YYYY"),
              announcement.user.username,
              announcement.user.role,
              announcement.group.name,
              announcement.message
            ])}
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
