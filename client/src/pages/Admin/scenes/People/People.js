import React, { Component } from "react";
import { connect } from "react-redux";

import { Item, Box, Container, Area } from "src/components/blocks";
import { Main } from "src/pages/Admin/components";

import CreatePerson from "./scenes/CreatePerson";
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

        <Main.SideModal routePath="/create-person">
          <CreatePerson />
        </Main.SideModal>
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
