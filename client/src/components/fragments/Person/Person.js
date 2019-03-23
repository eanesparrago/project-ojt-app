import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import _ from "lodash";

import PersonAccount from "./components/PersonAccount/PersonAccount";
import TraineeSchedule from "./components/TraineeSchedule/TraineeSchedule";

import enums from "src/services/enums";

export class Person extends Component {
  render() {
    const { data, match, afterEdit } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => <PersonAccount data={data} afterEdit={afterEdit} />}
        />

        {data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/schedule`}
            render={() => <TraineeSchedule data={data} afterEdit={afterEdit} />}
          />
        )}

        <Redirect to={`${match.url}`} replace />
      </Switch>
    );
  }
}

export default withRouter(Person);
