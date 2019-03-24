import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import { TextInput, FormGroup } from "src/components/compounds";
import { SideModal } from "src/components/layouts";

import { getGroups } from "src/services/session/actions/groupsActionCreators";
import { setFlashMessage } from "src/services/session/actions/appActionCreators";

export class SideModalCreateGroup extends Component {
  state = {
    data: {
      name: "",
      location: "",
      phoneNumber: ""
    },
    isLoading: false,
    errors: {}
  };

  handleInputChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { ...state } = this.state;
    const { ...props } = this.props;

    this.setState({ ...state, isLoading: true, errors: {} }, () => {
      axios
        .post("/api/groups", state.data)
        .then(res => {
          this.setState({ ...state, data: res.data }, () => {
            props.getGroups();
            props.history.goBack();
            props.setFlashMessage(
              `${res.data.name} was created successfully.`,
              "success"
            );
          });
        })
        .catch(err => {
          this.setState(
            {
              ...state,
              errors: err.response.data,
              isLoading: false
            },
            () => {
              props.setFlashMessage("An error occurred.", "error");
            }
          );
        });
    });
  };

  render() {
    const { isLoading, data, errors } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Create Group" />

        <SideModal.Body isLoading={isLoading} as="form">
          {[
            {
              label: "Group Name*",
              name: "name",
              type: "text",
              id: "group-name-input",
              autoFocus: true
            },
            {
              label: "Location",
              name: "location",
              type: "text",
              id: "location-input"
            },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "text",
              id: "phone-number-input"
            }
          ].map(item => (
            <Item margin="stack-base" key={item.id}>
              <FormGroup>
                <FormGroup.Label title={item.label} />

                <FormGroup.Input>
                  <TextInput
                    autoFocus={item.autoFocus}
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    value={data[item.name]}
                    onChange={this.handleInputChange}
                    error={errors[item.name]}
                    disabled={isLoading}
                  />
                </FormGroup.Input>
              </FormGroup>
            </Item>
          ))}

          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label />

              <FormGroup.Input>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </FormGroup.Input>
            </FormGroup>
          </Item>
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    null,
    {
      getGroups: getGroups,
      setFlashMessage: setFlashMessage
    }
  )(SideModalCreateGroup)
);
