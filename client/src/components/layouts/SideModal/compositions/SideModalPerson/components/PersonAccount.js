import React, { Component, Fragment } from "react";

import { Item, Box } from "src/components/blocks";
import { Button } from "src/components/elements";
import PersonInformation from "./PersonInformation";
import PersonEdit from "./PersonEdit";
import PersonChangePassword from "./PersonChangePassword";

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
    const { data, fetchPerson } = this.props;
    const { isEditOpen, isChangePasswordOpen } = this.state;

    return (
      <Fragment>
        <Box margin="stack-l">
          {isEditOpen || isChangePasswordOpen ? (
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
                <Button variant="secondary" onClick={this.toggleChangePassword}>
                  Change Password
                </Button>
              </Item>
            </Fragment>
          )}
        </Box>

        {(isEditOpen && (
          <PersonEdit
            data={data}
            fetchPerson={fetchPerson}
            closeForms={this.closeForms}
          />
        )) ||
          (isChangePasswordOpen && (
            <PersonChangePassword data={data} closeForms={this.closeForms} />
          )) || <PersonInformation data={data} />}
      </Fragment>
    );
  }
}

export default PersonAccount;
