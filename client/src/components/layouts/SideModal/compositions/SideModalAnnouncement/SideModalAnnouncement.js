import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import format from "date-fns/format";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import {
  DataGroup,
  ProfilePicture,
  FormGroup,
  TextAreaInput
} from "src/components/compounds";
import { SideModal } from "src/components/layouts";
import { AnnouncementInformation, AnnouncementEdit } from "./components";

import {
  getAnnouncement,
  deleteAnnouncement
} from "src/services/session/actions/announcementsActionCreators";

export class SideModalAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  componentDidMount() {
    const { match, getAnnouncement } = this.props;

    getAnnouncement(match.params.id);
  }

  handleToggleEdit = e => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  handleDelete = e => {
    e.preventDefault();
    const { deleteAnnouncement, history, match } = this.props;

    deleteAnnouncement(match.params.id).then(() => {
      history.goBack();
    });
  };

  render() {
    const {
      announcement: { data, isLoading, deleteAnnouncement }
    } = this.props;
    const { isEditOpen, message } = this.state;

    return (
      <SideModal>
        <SideModal.Header title="Announcement" />

        <SideModal.Body isLoading={isLoading}>
          {data ? (
            <Fragment>
              <Box margin="stack-l">
                {isEditOpen ? (
                  <Button
                    variant="secondary"
                    icon
                    onClick={this.handleToggleEdit}
                  >
                    <i className="fas fa-arrow-left" />
                    <span id="hidden">Back</span>
                  </Button>
                ) : (
                  <Fragment>
                    <Item margin="inline-base">
                      <Button
                        variant="secondary"
                        onClick={this.handleToggleEdit}
                      >
                        Edit Announcement
                      </Button>
                    </Item>
                    <Item>
                      <Button variant="secondary" onClick={this.handleDelete}>
                        Delete Announcement
                      </Button>
                    </Item>
                  </Fragment>
                )}
              </Box>

              {isEditOpen ? (
                <AnnouncementEdit handleToggleEdit={this.handleToggleEdit} />
              ) : (
                <AnnouncementInformation />
              )}
            </Fragment>
          ) : (
            <Item>
              <Typography variant="base">Announcement not found.</Typography>
            </Item>
          )}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      announcement: state.announcements.announcement
    }),
    {
      getAnnouncement: getAnnouncement,
      deleteAnnouncement: deleteAnnouncement
    }
  )(SideModalAnnouncement)
);
