import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import PersonAccount from "./components/PersonAccount/PersonAccount";
import TraineeSchedule from "./components/TraineeSchedule/TraineeSchedule";
import DailyTimeRecord from "./components/DailyTimeRecord/DailyTimeRecord";
import Tasks from "./components/Tasks/Tasks";
import Activity from "./components/Activity/Activity";

import enums from "src/services/enums";

export class Person extends Component {
  render() {
    const { match, person } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => <PersonAccount person={person} />}
        />

        {/* >>> Should be in separate conditional to avoid warning.. ??? */}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/schedule`}
            render={() => <TraineeSchedule person={person} />}
          />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/daily-time-record`}
            render={() => <DailyTimeRecord person={person} />}
          />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route path={`${match.url}/tasks`} render={() => <Tasks />} />
        )}

        <Redirect to={`${match.url}`} replace />
      </Switch>
    );
  }
}

export default withRouter(Person);
