import React from "react";
import styled from "styled-components";
import format from "date-fns/format";

import { Item, Container } from "src/components/blocks";
import { Typography } from "src/components/elements";
import { Avatar } from "src/components/compounds";

const StyledAnnouncementItem = styled.article`
  width: 100%;
  border-bottom: 1px solid ${p => p.theme.color.primary.light};

  .container-announcementItem-header {
    display: flex;
    align-items: center;
  }

  .item-announcementItem-photo {
    width: var(--size-button);
    height: var(--size-button);
  }

  .item-announcementItem-date {
    margin-left: auto;
  }
`;

const AnnouncementItem = ({ announcementData }) => {
  return (
    <StyledAnnouncementItem>
      <Container NAME="announcementItem-header" margin="stack-m">
        <Item margin="inline-s">
          <Avatar userData={announcementData.user} />
        </Item>

        <Container>
          <Item margin="stack-s">
            <Typography variant="display-4" as="h1">
              {announcementData.user.username}
            </Typography>
          </Item>

          <Item NAME="announcementItem-date">
            <Typography variant="caption">
              {format(announcementData.dateCreated, "MMMM D DDD, H:mm")}
            </Typography>
          </Item>
        </Container>
      </Container>

      <Item margin="stack-base">
        <Typography variant="body" as="p">
          {announcementData.message}
        </Typography>
      </Item>
    </StyledAnnouncementItem>
  );
};

export default AnnouncementItem;
