import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import {
  FormGroup,
  SelectInput,
  TextAreaInput
} from "src/components/compounds";
import { SideModal } from "src/components/layouts";

import { getAnnouncements } from "src/services/session/actions/announcementsActionCreators";
import { setFlashMessage } from "src/services/session/actions/appActionCreators";

export class SideModalCreateAnnouncement extends Component {
  state = {
    announcement: {
      group: "",
      message: ""
    },
    isLoading: false,
    errors: {},
    groups: null
  };

  componentDidMount() {
    this.setState({ ...this.state, isLoading: true }, () => {
      axios
        .get("/api/groups?field=name")
        .then(res => {
          this.setState({ ...this.state, groups: res.data, isLoading: false });
        })
        .catch(err => {
          this.setState({
            ...this.state,
            errors: err.response.data,
            isLoading: false
          });
        });
    });
  }

  handleInputChange = e => {
    this.setState({
      announcement: {
        ...this.state.announcement,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { getAnnouncements, setFlashMessage, history } = this.props;

    this.setState(
      {
        ...this.state,
        isLoading: true,
        errors: {}
      },
      () => {
        axios
          .post("/api/announcements", { announcement: this.state.announcement })
          .then(res => {
            this.setState(
              ({
                ...this.state,
                isLoading: false
              },
              () => {
                setFlashMessage(
                  "Announcement was created successfully.",
                  "success"
                );
                getAnnouncements();
                history.goBack();
              })
            );
          })
          .catch(err => {
            this.setState({
              ...this.state,
              errors: err.response.data,
              isLoading: false
            });
          });
      }
    );
  };

  render() {
    const { announcement, groups, isLoading, errors } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Create Announcement" />

        <SideModal.Body isLoading={isLoading} as="form">
          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label title="Group" htmlFor="group-input" />

              <FormGroup.Input>
                {groups && (
                  <SelectInput
                    autoFocus
                    id="group-input"
                    value={announcement.group}
                    name="group"
                    options={groups.map(group => ({
                      label: group.name,
                      value: group._id
                    }))}
                    error={errors["announcement.group"]}
                    disabled={isLoading}
                    withPlaceholder
                    onChange={this.handleInputChange}
                  />
                )}
              </FormGroup.Input>
            </FormGroup>
          </Item>

          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label title="Message" htmlFor="message-input" />

              <FormGroup.Input>
                <TextAreaInput
                  id="message-input"
                  value={announcement.message}
                  name="message"
                  cols="30"
                  rows="10"
                  error={errors["announcement.message"]}
                  disabled={isLoading}
                  onChange={this.handleInputChange}
                />
              </FormGroup.Input>
            </FormGroup>
          </Item>

          <Item margin="stack-base">
            <FormGroup>
              <FormGroup.Label />

              <FormGroup.Input>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
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
    { setFlashMessage: setFlashMessage, getAnnouncements: getAnnouncements }
  )(SideModalCreateAnnouncement)
);
