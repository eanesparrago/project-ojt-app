import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import { Item, Box, Container, Area } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import { SideModal } from "src/components/layouts";

import PersonInformation from "./components/PersonInformation";
import PersonEdit from "./components/PersonEdit";
import PersonChangePassword from "./components/PersonChangePassword";

export class SideModalPerson extends Component {
  state = {
    person: {},
    isLoading: false,
    errors: {}
  };

  fetchPerson = () => {
    const { ...state } = this.state;
    const { ...props } = this.props;

    this.setState({ ...state, isLoading: true }, () => {
      axios
        .get(`/api/users/${props.match.params.id}`)
        .then(res => {
          this.setState({ ...state, person: res.data, isLoading: false });
        })
        .catch(err => {
          this.setState({
            ...state,
            isLoading: false,
            errors: err.response.data
          });
        });
    });
  };

  componentDidMount() {
    this.fetchPerson();
  }

  handleInputChange = e => {
    this.setState({
      person: { ...this.state.person, [e.target.name]: e.target.value }
    });
  };

  render() {
    const { history, match } = this.props;
    const { person, isLoading, errors } = this.state;

    return (
      <SideModal>
        <SideModal.Header
          title={person.username}
          buttons={[
            { title: "Edit Person", icon: "fas fa-edit", to: "/edit-person" },
            {
              title: "Change Password",
              icon: "fas fa-lock",
              to: "/change-password"
            }
          ]}
          isLoading={isLoading}
        />

        <SideModal.Body isLoading={isLoading}>
          {_.isEmpty(person) ? (
            <Item>
              <Typography variant="base">User not found</Typography>
            </Item>
          ) : (
            <Switch>
              <Route
                exact
                path={`${match.url}`}
                render={() => <PersonInformation data={person} />}
              />

              <Route
                path={`${match.url}/edit-person`}
                render={() => (
                  <PersonEdit data={person} fetchPerson={this.fetchPerson} />
                )}
              />

              <Route
                path={`${match.url}/change-password`}
                render={() => <PersonChangePassword data={person} />}
              />
            </Switch>
          )}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(SideModalPerson);
