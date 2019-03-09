import React from "react";
import styled from "styled-components";
import { Item, Container } from "src/components/blocks";
import { Button, Typography } from "src/components/elements";

const StyledActivityItem = styled.article`
  display: flex;
  /* border-bottom: 1px solid ${p => p.theme.color.dark}; */

  .container-activityItem-content {
    padding-top: var(--size-xs);
  }

  .item-activityItem-photo {
    width: var(--size-button);
    height: var(--size-button);
  }
`;

const ActivityItem = () => {
  return (
    <StyledActivityItem>
      <Item NAME="activityItem-photo" margin="inline-s">
        <Button variant="photo" rounded>
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTM2NzI3NTU5Nl5BMl5BanBnXkFtZTcwODkxODAwNA@@._V1_UY256_CR9,0,172,256_AL_.jpg"
            alt=""
          />
        </Button>
      </Item>

      <Container NAME="activityItem-content">
        <Item margin="stack-s">
          <Typography as="p">
            <Typography bold inline>
              Steven Universe
            </Typography>{" "}
            timed out.
          </Typography>
        </Item>

        <Item>
          <Typography variant="caption">February 18, 2019, 12:00 pm</Typography>
        </Item>
      </Container>
    </StyledActivityItem>
  );
};

export default ActivityItem;
