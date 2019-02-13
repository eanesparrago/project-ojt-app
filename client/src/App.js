import React, { Component, Fragment } from "react";
import "./assets/css/destyle.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/session/store";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./services/theme/theme";
import { Main } from "./pages";

const GlobalStyle = createGlobalStyle`
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <GlobalStyle />

              <Switch>
                <Route path="/" exact>
                  <Main />
                </Route>

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
