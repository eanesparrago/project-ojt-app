import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { Button } from "src/components/elements";

import profilePhotoPlaceholder from "src/assets/images/profile-photo-placeholder.png";

const StyledAvatar = styled.div`
  width: var(--size-button);
  height: var(--size-button);
`;

const Avatar = ({ match, src, id }) => {
  return (
    <StyledAvatar>
      <Button
        variant="photo"
        rounded
        as={Link}
        to={`${match.url}/person/${id}`}
      >
        {src ? (
          <img src={src} alt="" />
        ) : (
          <img src={profilePhotoPlaceholder} alt="" />
        )}
      </Button>
    </StyledAvatar>
  );
};

export default withRouter(Avatar);
