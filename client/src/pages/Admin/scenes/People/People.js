import React, { Component } from "react";
import { connect } from "react-redux";

import { Main } from "src/pages/Admin/components";

import PeopleTable from "./components/PeopleTable";

import { getPeople } from "./peopleActionCreators";
export class People extends Component {
  componentDidMount() {
    this.props.getPeople();
  }

  render() {
    const { people } = this.props;

    return (
      <Main>
        <Main.Header
          title="People"
          buttonText="Create Person"
          buttonPath="/create-person"
        />

        <Main.Body isLoading={people.isLoading}>
          <PeopleTable />
        </Main.Body>
      </Main>
    );
  }
}

export default connect(
  state => ({
    people: state.admin.people
  }),
  { getPeople: getPeople }
)(People);
