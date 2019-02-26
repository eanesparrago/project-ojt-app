import React from "react";
import styled from "styled-components";
import { Item, Container } from "src/layout";
import { Button, Typography, Photo } from "src/components/elements";

const StyledUserListItem = styled.div`
  /* border: 1px solid magenta; */
  height: var(--size-button);
  display: flex;
  align-items: center;

  > .item-photo {
    width: var(--size-button);
    height: var(--size-button);
  }
`;

const UserItem = () => {
  return (
    <StyledUserListItem>
      <Item NAME="photo" margin="inline-s">
        <Photo rounded>
          <img
            src="https://images-na.ssl-images-amazon.com/images/M/MV5BNWRmYWVlNmQtNTRiOS00YjBjLWE0MDAtNWYwZGVkMjgwY2M0XkEyXkFqcGdeQXVyMTgwMTYzNQ@@._V1_UY256_CR106,0,172,256_AL_.jpg"
            alt=""
          />
        </Photo>
      </Item>

      <Item>
        <Typography variant="normal">Steven Universe</Typography>
      </Item>
    </StyledUserListItem>
  );
};

export default UserItem;
