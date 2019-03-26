import React from "react";
import styled from "styled-components";

import { Item } from "src/components/blocks";
import { Typography } from "src/components/elements";
import { Avatar } from "src/components/compounds";

const StyledUserListItem = styled.div`
  /* border: 1px solid magenta; */
  height: var(--size-button);
  display: flex;
  align-items: center;
`;

const UserItem = ({ user }) => {
  return (
    <StyledUserListItem>
      <Item margin="inline-m">
        <Avatar userData={user} />
      </Item>

      <Item>
        <Typography variant="normal">{user.username}</Typography>
      </Item>
    </StyledUserListItem>
  );
};

export default UserItem;
