import React, { Component, Fragment } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/session/store";
import { ThemeProvider } from "styled-components";

import theme from "./services/theme/theme";
import "./assets/css/destyle.css";
import GlobalStyle from "./GlobalStyle";

import PrivateRoute from "./components/utils/PrivateRoute";

import {
  setCurrentUser,
  logoutUser
} from "src/services/session/actions/authActionCreators";
import setAuthToken from "src/services/session/utils/setAuthToken";
import enums from "./services/enums";

import { App, Login, Initialize } from "./pages";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    console.log(decoded.exp);

    //  Redirect to login
    window.location.href = "/";

    console.log("Token expired");
  }
}

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <GlobalStyle />

              <Switch>
                <Route path="/" exact component={Login} />

                <PrivateRoute
                  path="/app"
                  component={App}
                  permittedRoles={[
                    enums.roles.ADMINISTRATOR,
                    enums.roles.SUPERVISOR,
                    enums.roles.TRAINEE,
                    enums.roles.EMPLOYEE
                  ]}
                />

                <PrivateRoute
                  path="/initialize"
                  component={Initialize}
                  permittedRoles={[
                    enums.roles.TRAINEE,
                    enums.roles.EMPLOYEE,
                    enums.roles.SUPERVISOR
                  ]}
                />

                <Route render={() => <h1>Not found</h1>} />
              </Switch>
            </Fragment>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default Main;
