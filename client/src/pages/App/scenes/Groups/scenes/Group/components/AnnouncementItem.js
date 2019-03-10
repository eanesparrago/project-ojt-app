import React from "react";
import styled from "styled-components";
import { Item, Container } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";

const StyledAnnouncementItem = styled.article`
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
    /* border: 1px solid magenta; */
    margin-left: auto;
  }
`;

const AnnouncementItem = () => {
  return (
    <StyledAnnouncementItem>
      <Container NAME="announcementItem-header" margin="stack-m">
        <Item NAME="announcementItem-photo" margin="inline-s">
          <Button variant="photo" rounded>
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
              alt=""
            />
          </Button>
        </Item>

        <Container>
          <Item margin="stack-s">
            <Typography variant="display-4" as="h1">
              Steven Universe
            </Typography>
          </Item>

          <Item NAME="announcementItem-date">
            <Typography variant="caption">
              February 18, 2019, 12:00 pm
            </Typography>
          </Item>
        </Container>
      </Container>

      <Item margin="stack-base">
        <Typography variant="body" as="p">
          Incididunt incididunt incididunt id occaecat consequat duis. Aliqua
          ipsum ea et et nulla quis labore sunt est voluptate sit et. Elit sunt
          deserunt est sint. Duis ipsum ad ea veniam quis incididunt. Esse do
          sunt aute et esse pariatur irure aliqua officia occaecat fugiat
          nostrud nisi. Amet occaecat exercitation magna ullamco commodo
          occaecat ex cupidatat minim deserunt et aliquip velit et. In elit
          veniam aliquip proident ipsum.
        </Typography>
      </Item>
    </StyledAnnouncementItem>
  );
};

export default AnnouncementItem;
