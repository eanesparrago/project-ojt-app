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

import { getGroup } from "src/services/session/actions/groupActionCreators";
import { getAnnouncements } from "src/services/session/actions/announcementsActionCreators";
import { setFlashMessage } from "src/services/session/actions/appActionCreators";

import enums from "src/services/enums";

export class SideModalCreateAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      announcement: {
        group: props.location.state ? props.location.state.group : "all",
        message: ""
      },
      isLoading: false,
      errors: {},
      groups: null
    };
  }

  componentDidMount() {
    const { auth } = this.props;

    this.setState({ ...this.state, isLoading: true }, () => {
      axios
        .get("/api/groups?field=name")
        .then(res => {
          this.setState(
            {
              ...this.state,
              groups: res.data,
              isLoading: false
            },
            () => {
              if (auth.user.role !== enums.roles.ADMINISTRATOR) {
                this.setState({
                  ...this.state,
                  announcement: {
                    group: auth.user.roleData.group
                  }
                });
              }
            }
          );
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

    const { getAnnouncements, setFlashMessage, getGroup, history } = this.props;

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
                
                if (res.data.announcement.isGlobal === false) {
                  getGroup(res.data.announcement.group);
                }

                history.goBack();
              })
            );
          })
          .catch(err => {
            this.setState(
              {
                ...this.state,
                errors: err.response.data,
                isLoading: false
              },
              () => {
                setFlashMessage("An error occurred.", "error");
              }
            );
          });
      }
    );
  };

  render() {
    const { announcement, groups, isLoading, errors } = this.state;
    const {
      auth: {
        user: { role }
      }
    } = this.props;

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
                    options={[
                      {
                        label: "All",
                        value: "all"
                      },
                      ...groups.map(group => ({
                        label: group.name,
                        value: group._id
                      }))
                    ]}
                    error={errors["announcement.group"]}
                    disabled={isLoading || role !== enums.roles.ADMINISTRATOR}
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
    state => ({
      auth: state.auth
    }),
    {
      setFlashMessage,
      getAnnouncements,
      getGroup
    }
  )(SideModalCreateAnnouncement)
);
