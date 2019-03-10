import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

const PrivateRoute = ({
  component: Component,
  auth,
  permittedRoles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true &&
      _.includes(permittedRoles, auth.user.role) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  state => ({
    auth: state.auth
  }),
  null
)(PrivateRoute);
