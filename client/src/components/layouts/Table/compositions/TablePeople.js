import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "src/components/layouts";

export class TablePeople extends Component {
  render() {
    const {
      people: { data }
    } = this.props;

    return (
      <Table>
        <Table.Header />

        {data && (
          <Table.Body
            headings={[
              {
                property: ["profilePictureUrl", "username"],
                title: "Username",
                type: "user"
              },
              {
                property: "role",
                title: "Role"
              },
              {
                property: "dateCreated",
                title: "Date Created",
                type: "date"
              }
            ]}
            data={data}
            route="/person"
          />
        )}
      </Table>
    );
  }
}

export default connect(
  state => ({
    people: state.people
  }),
  null
)(TablePeople);
