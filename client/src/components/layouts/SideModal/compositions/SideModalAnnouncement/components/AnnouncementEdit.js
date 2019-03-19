import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item } from "src/components/blocks";
import { Button } from "src/components/elements";
import { FormGroup, TextAreaInput } from "src/components/compounds";

import { editAnnouncement } from "src/services/session/actions/announcementsActionCreators";

export class AnnouncementEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.announcement.data.message
    };
  }

  handleInputChange = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = e => {
    const { handleToggleEdit } = this.props;

    e.preventDefault();
    const {
      editAnnouncement,
      announcement: { data }
    } = this.props;

    editAnnouncement(data._id, this.state).then(() => {
      handleToggleEdit();
    });
  };

  render() {
    const {
      announcement: { isLoading, errors }
    } = this.props;

    return (
      <Fragment>
        <Item margin="stack-base">
          <FormGroup>
            <FormGroup.Label title="Message" />
            <FormGroup.Input>
              <TextAreaInput
                id="message-input"
                value={this.state.message}
                name="message"
                cols="30"
                rows="10"
                error={errors.message}
                disabled={isLoading}
                onChange={this.handleInputChange}
              />
            </FormGroup.Input>
          </FormGroup>
        </Item>

        <FormGroup>
          <FormGroup.Label />
          <FormGroup.Input>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </FormGroup.Input>
        </FormGroup>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      announcement: state.announcements.announcement
    }),
    {
      editAnnouncement: editAnnouncement
    }
  )(AnnouncementEdit)
);
