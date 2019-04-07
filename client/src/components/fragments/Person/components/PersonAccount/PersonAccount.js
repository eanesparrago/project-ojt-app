import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Item, Box } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";
import PersonInformation from "./PersonInformation";
import PersonEdit from "./PersonEdit";
import PersonChangePassword from "./PersonChangePassword";

import enums from "src/services/enums";

export class PersonAccount extends Component {
  state = {
    isEditOpen: false,
    isChangePasswordOpen: false
  };

  toggleEdit = () => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  toggleChangePassword = () => {
    this.setState({ isChangePasswordOpen: !this.state.isEditOpen });
  };

  closeForms = () => {
    this.setState({ isEditOpen: false, isChangePasswordOpen: false });
  };

  render() {
    const {
      person,
      auth: {
        user: { role }
      }
    } = this.props;
    const { isEditOpen, isChangePasswordOpen } = this.state;

    return (
      <Fragment>
        <Box margin="stack-l">
          <Item center margin="inline-base">
            <Typography variant="display-2">Account</Typography>
          </Item>

          {role === enums.roles.ADMINISTRATOR ? (
            isEditOpen || isChangePasswordOpen ? (
              <Button variant="secondary" icon onClick={this.closeForms}>
                <i className="fas fa-arrow-left" />
                <span id="hidden">Back</span>
              </Button>
            ) : (
              <Fragment>
                <Item margin="inline-base">
                  <Button variant="secondary" onClick={this.toggleEdit}>
                    Edit Account
                  </Button>
                </Item>
                <Item>
                  <Button
                    variant="secondary"
                    onClick={this.toggleChangePassword}
                  >
                    Change Password
                  </Button>
                </Item>
              </Fragment>
            )
          ) : null}
        </Box>

        {(isEditOpen && (
          <PersonEdit person={person} closeForms={this.closeForms} />
        )) ||
          (isChangePasswordOpen && (
            <PersonChangePassword
              person={person}
              closeForms={this.closeForms}
            />
          )) || <PersonInformation person={person} />}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  null
)(PersonAccount);
