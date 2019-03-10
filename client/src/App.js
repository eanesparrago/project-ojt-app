import React, { Component, Fragment } from "react";
import jwt_decode from "jwt-decode";
import "./assets/css/destyle.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/session/store";
import { ThemeProvider } from "styled-components";
import theme from "./services/theme/theme";
import {
  setCurrentUser,
  logoutUser
} from "src/services/session/actions/authActionCreators";
import setAuthToken from "src/services/session/utils/setAuthToken";
import GlobalStyle from "./GlobalStyle";
import { Login, Admin } from "./pages";
import PrivateRoute from "./PrivateRoute";
import enums from "./services/enums";

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

class App extends Component {
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
                  path="/admin"
                  component={Admin}
                  permittedRoles={[enums.roles.ADMINISTRATOR]}
                />

                <PrivateRoute
                  path="/app"
                  component={() => <h1>App</h1>}
                  permittedRoles={[
                    enums.roles.SUPERVISOR,
                    enums.roles.TRAINEE,
                    enums.roles.EMPLOYEE
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

export default App;
