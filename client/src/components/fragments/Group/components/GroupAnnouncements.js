import React from "react";
import styled from "styled-components";

import { Button, Typography } from "src/components/elements";
import { Item, Area } from "src/components/blocks";
import AnnouncementItem from "./AnnouncementItem";

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
    display: grid;
    overflow-y: auto;
    padding-top: var(--size-xs);
    padding-right: var(--size-base);
  }
`;

const GroupAnnouncements = ({ groupData: { announcements } }) => {
  return (
    <StyledGroupAnnouncements>
      <Area NAME="header" margin="stack-m">
        <Item center margin="inline-base">
          <Typography variant="display-3">Announcements</Typography>
        </Item>

        <Item>
          <Button variant="secondary" icon rounded>
            <i className="fas fa-plus" />
          </Button>
        </Item>
      </Area>

      <Area NAME="announcements">
        {announcements.reverse().map(announcement => (
          <Item margin="stack-base">
            <AnnouncementItem announcementData={announcement} />
          </Item>
        ))}
      </Area>
    </StyledGroupAnnouncements>
  );
};

export default GroupAnnouncements;
