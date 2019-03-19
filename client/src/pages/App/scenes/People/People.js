import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/App/components";
import PeopleTable from "./components/PeopleTable";
import { TablePeople } from "src/components/layouts/Table/compositions";

import { getPeople } from "src/services/session/actions/peopleActionCreators";

import enums from "src/services/enums";

export class People extends Component {
  componentDidMount() {
    this.props.getPeople();
  }

  render() {
    const {
      people: { isLoading }
    } = this.props;

    return (
      <Main>
        <Main.Header
          title="People"
          buttonText="Create Person"
          buttonPath="/create-person"
          buttonPermissions={[enums.roles.ADMINISTRATOR]}
        />

        <Main.Body isLoading={isLoading}>
          <TablePeople />
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    people: state.people
  }),
  { getPeople: getPeople }
)(People);
