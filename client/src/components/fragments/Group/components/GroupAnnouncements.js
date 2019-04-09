import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Typography } from "src/components/elements";
import { Item, Area } from "src/components/blocks";
import AnnouncementItem from "./AnnouncementItem";

import enums from "src/services/enums";

const StyledGroupAnnouncements = styled.section`
  display: grid;
  grid-area: announcements;
  grid-template-rows: auto 1fr;
  overflow-y: auto;
  padding-top: var(--size-xs);
  border-right: 2px solid ${p => p.theme.color.primary.light};

  .area-header {
    grid-row: 1 / 2;
    display: flex;
  }

  .area-announcements {
    overflow-y: auto;
    padding-top: var(--size-xs);
    padding-right: var(--size-base);
  }
`;

const GroupAnnouncements = ({ groupData: { announcements }, match, auth }) => {
  const newAnnouncements = announcements.slice(0).reverse();

  return (
    <StyledGroupAnnouncements>
      <Area NAME="header" margin="stack-m">
        <Item center margin="inline-base">
          <Typography variant="display-3">Announcements</Typography>
        </Item>

        {(auth.user.role === enums.roles.ADMINISTRATOR ||
          auth.user.role === enums.roles.SUPERVISOR) && (
          <Item>
            <Button
              variant="secondary"
              as={Link}
              to={{
                pathname: `${match.url}/create-announcement`,
                state: { group: match.params.id }
              }}
              icon
              rounded
            >
              <i className="fas fa-plus" />
            </Button>
          </Item>
        )}
      </Area>

      <Area NAME="announcements">
        {newAnnouncements.map(announcement => (
          <Item margin="stack-base" key={announcement._id}>
            <AnnouncementItem announcementData={announcement} />
          </Item>
        ))}
      </Area>
    </StyledGroupAnnouncements>
  );
};

export default withRouter(
  connect(state => ({
    auth: state.auth
  }))(GroupAnnouncements)
);
