import React from "react";
import styled from "styled-components";

import { Item, Container } from "src/layout";
import { Button, Typography, Photo } from "src/components/elements";
import { Avatar } from "src/components/compounds";

const StyledUserListItem = styled.div`
  /* border: 1px solid magenta; */
  height: var(--size-button);
  display: flex;
  align-items: center;
`;

const UserItem = ({
  data: { profilePictureUrl, firstName, lastName, _id, username }
}) => {
  let name;
  if (firstName === "" || lastName === "") {
    name = username;
  } else {
    name = `${firstName} ${lastName}`;
  }

  return (
    <StyledUserListItem>
      <Item margin="inline-m">
        <Avatar src={profilePictureUrl} id={_id} />
      </Item>

      <Item>
        <Typography variant="normal">{name}</Typography>
      </Item>
    </StyledUserListItem>
  );
};

export default UserItem;
